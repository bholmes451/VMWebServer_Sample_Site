// --------------------- function DoVmResponseCallback() -------------------
//////////////////////////////////////////////
// Calls response callback.
//////////////////////////////////////////////
function DoVmResponseCallback(stResponseCbFunct, stResponse)
{
    if (stResponseCbFunct != undefined)
       eval(stResponseCbFunct + '(stResponse)');
}

// --------------------- function VMSendCommand() -------------------
////////////////////////////////////////////////////////
// Send VenueMagic CLI command via Http request object.
////////////////////////////////////////////////////////
function VMSendCommand(stCmd, stResponseCbFunct)
{
    var stResponse;
//    alert(stCmd);
	httpReq = getXMLHTTPRequest();

	httpReq.onreadystatechange = function() 
	{
	    if (httpReq.readyState == 4)
	    {
	        if (httpReq.status == 200)
	        {
	            stResponse = httpReq.responseText;
	        }
	        else
	        {
	            // Report Error
	            stResponse = "ERROR: HTTP request failed";
	        }
	        DoVmResponseCallback(stResponseCbFunct, stResponse);
	    }
	
	}
	httpReq.open("GET", "VMCMD?command="+stCmd+"&rand="+parseInt(Math.random()*999999999), true);
	httpReq.send(null);
}

// --------------------- function VMRunTimeline() -------------------
////////////////////////////////////////////////////////
// Run VenueMagic timeline.
////////////////////////////////////////////////////////
function VMRunTimeline(stTimeline, stNameInCuelist, fVolume, fLampLevel, bPlayInLoop, bPlayOneOnly, nPlayAs)
{
    if (stTimeline != undefined)
    {
        stArgs = "\""+stTimeline+"\"";
        if (stNameInCuelist != undefined)
        {
            stArgs += ",\""+stNameInCuelist+"\"";
            if (fVolume != undefined)
            {
                stArgs += "," + fVolume;
                if (fLampLevel != undefined)
                {
                    stArgs += "," + fLampLevel;
                    if (bPlayInLoop != undefined)
                    {
                        stArgs += ",";
                        stArgs +=  bPlayInLoop ? "1" : "0";
                        if (bPlayOneOnly != undefined)
                        {
                            stArgs += ",";
                            stArgs +=  bPlayOneOnly ? "1" : "0";
                            if (nPlayAs != undefined)
                            {
                                stArgs += "," + nPlayAs;
                            }
                        }
                   }
              }
            }
        }
        stCmd = "$Event.RunTimeline(" + stArgs + ")";
        VMSendCommand(stCmd);   // RunTimeline needs no callback
        return true;
    }
    return false;
}

// --------------------- function VMCuelistCommand() -------------------
////////////////////////////////////////////////////////
// Send VenueMagic cuelist command.
////////////////////////////////////////////////////////
function VMCuelistCommand(stCuelistCmd, stNameInCuelist)
{
    stCmd = "$Event.CUELIST."+stCuelistCmd;
    
    if (stNameInCuelist != undefined)
    {
        stCmd += "(\""+stNameInCuelist+"\")";
    }
    
    VMSendCommand(stCmd);
}

// --------------------- function VMSetTapperBpm() -------------------
////////////////////////////////////////////////////////
// Set VenueMagic beat tapper bpm.
////////////////////////////////////////////////////////
function VMSetTapperBpm(fBpm)
{
    VMSendCommand("$Event.SETTAPPERBPM(" + fBpm + ")");
}

// --------------------- function VMSetRoutingPreset() -------------------
////////////////////////////////////////////////////////
// Change VenueMagic channel routing preset.
////////////////////////////////////////////////////////
function VMSetRoutingPreset(stPreset)
{
    VMSendCommand("$Event.SETPRESET(\"" + stPreset + "\")");
}

// --------------------- function VMSetVarTableVar() -------------------
////////////////////////////////////////////////////////
// Set VenueMagic variable table variable.
////////////////////////////////////////////////////////
function VMSetVarTableVar(stVarName, stOp, fParam1, fParam2)
{
    stArgs = "\"" + stVarName + "\",\""+stOp+"\","+fParam1;
    
    if (fParam2 != undefined)
    {
        stArgs += "," + fParam2;
    }
    
    VMSendCommand("$Event.SETVAR(" + stArgs + ")");
}

// --------------------- function VMRunScriptProc() -------------------
////////////////////////////////////////////////////////
// Run VenueMagic script procedure.
////////////////////////////////////////////////////////
function VMRunScriptProc(stScriptName, stProc, vParam)
{
    stArgs = "\"" + stScriptName + "\",\""+stProc+"\"";
    
    if (vParam != undefined)
    {
        stArgs += ",\"" + vParam + "\"";
    }
    VMSendCommand("$Event.Script(" + stArgs + ")");
    
}

// --------------------- function VMRunScriptEvent() -------------------
////////////////////////////////////////////////////////
// Trigger a WebServer script event.
////////////////////////////////////////////////////////
function VMRunScriptEvent(stEvent)
{
    if (stEvent != undefined)
    {
        stArgs = "\"" + stEvent + "\"";
        VMSendCommand("FireEvent(" + stArgs + ")");
    }
}

// --------------------- function VMSetScriptOutputLevel() -------------------
////////////////////////////////////////////////////////
// Set a WebServer script output level.
////////////////////////////////////////////////////////
function VMSetScriptOutputLevel(stOutput, fLevel)
{
    if ((stOutput != undefined) && (fLevel != undefined))
    {
        stArgs = "\"" + stOutput + "\","+fLevel;
        VMSendCommand("SetOutput(" + stArgs + ")");
    }
}

// --------------------- function VMGetScriptInputLevel() -------------------
////////////////////////////////////////////////////////
// Retrieve a Webserver script input level.
////////////////////////////////////////////////////////
function VMGetScriptInputLevel(stInput, stResponseCbFunct)
{
    if ((stInput != undefined) && (stResponseCbFunct != undefined))
    {
        stArgs = "\"" + stInput + "\"";
        VMSendCommand("GetInput(" + stArgs + ")", stResponseCbFunct);
    }
}

// --------------------- function VMRunCueButton() -------------------
////////////////////////////////////////////////////////
// Fire a VM cue button.
////////////////////////////////////////////////////////
function VMRunCueButton(stGroupName, stButtonCaption)
{
    stArgs = "\"" + stGroupName + "\",\""+stButtonCaption+"\"";
    VMSendCommand("$Project.CueList:RunCueButton(" + stArgs + ")");
}


// --------------------- function VMSetVcsSliderLevel() -------------------
////////////////////////////////////////////////////////
// Set the level of a VCS slider.
////////////////////////////////////////////////////////
function VMSetVcsSliderLevel(stSliderAddr, fLevel)
{
     if ((stSliderAddr != undefined) && (fLevel != undefined))
    {
        stArgs = "\"" + stSliderAddr + "\","+fLevel;
        VMSendCommand("$Project.Vcs:(" + stArgs + ")");
    }
   
    VMSendCommand("$Project.Vcs:SetSliderLevel(" + stArgs + ")");
}