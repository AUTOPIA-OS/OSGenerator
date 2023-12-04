// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

let labelList = [
  "Core ID",       
  "Task ID",        
  "Priority",      
  "Handle Name",    
  "Task State",     
  "Schedule",      
  "Version",       
  "Maximum Activation", 
  "Resources Used"
];
let labelListInterrupt = [
  "Core ID",       
  "Priority",      
  "Handler Name",
  "ISR Category"];
let labelListCat2 = [
  "SCHEDULE",
  "VERSION",
  "Maximum Activation",
  "Resources Used"
];
let labelListCounter = [
  "Core ID",       
  "Counter ID",
  "Maximum Value",
  "Version"
];
let labelListAlarm = [
  "Counter ID",
  "Alarm ID",
  "Maximum Allowed Value",
  "Ticks Per Base",
  "Minimum Cycle",
  "Start",
  "Cycle",
  "Alarm Action",
  "Task ID",
  "Event Mask",
  "Autostart",
];
let labelListResource = [
  "Resource ID",
  "Resource Property"
];
// create a list of the given labels






function MainPage() {
  const [appID, setAppID] = useState(-1);
  const [taskID, setTaskID] = useState(-1);
  const [priority, setPriority] = useState(-1);
  const [handleName, setHandleName] = useState("");
  const [taskState, setTaskState] = useState("");
  const [schedule, setSchedule] = useState("");
  const [version, setVersion] = useState("");
  const [maxActivation, setMaxActivation] = useState(-1);
  const [resourcesUsed, setResourcesUsed] = useState([]);
  const [pressed, setPressed] = useState(0);
  const  [tasksList, setTasksList] = useState([[], [], [], [], [], []]);
  const [isrCat, setIsrCat] = useState("");
  const [counterID, setCounterID] = useState(-1);
  const [maxValue, setMaxValue] = useState(-1);
  const [counterVersion, setCounterVersion] = useState("");
  const [interruptsList, setInterruptsList] = useState([[], [], [], [], [], []]);
  const [countersList, setCountersList] = useState([[], [], [], [], [], []]);
  const [alarmID, setAlarmID] = useState(-1);
  const [ticksPerBase, setTicksPerBase] = useState(-1);
  const [minimumCycle, setMinimumCycle] = useState(-1);
  const [start, setStart] = useState(-1);
  const [cycle, setCycle] = useState(-1);
  const [alarmAction, setAlarmAction] = useState("");
  const [eventMask, setEventMask] = useState(-1);
  const [autostart, setAutostart] = useState(-1);
  const [alarmsList, setAlarmsList] = useState([[], [], [], [], [], []]);
  const [resourceID, setResourceID] = useState(-1);
  const [resourceProperty, setResourceProperty] = useState("STANDARD");
  const [resourcesList, setResourcesList] = useState([]);


  let variables = [appID, taskID, priority, handleName, taskState, schedule, version, maxActivation, resourcesUsed];
  let options = [[], [], [], [], ["SUSPENDED", "READY", "RUNNING", "WAITING"], ["FULL", "NON"], ["BASIC", "EXTENDED" ], [], []]
  let variablesInterrupt = [appID, priority, handleName, isrCat];
  let optionsInterrupt = [[], [], [], ["CAT1", "CAT2"]];
  let variablesCat2 = [schedule, version, maxActivation, resourcesUsed];
  let optionsCat2 = [ ["FULL", "NON"], ["BASIC", "EXTENDED" ], [], []];
  let variablesCounter = [appID, counterID, maxValue, counterVersion];
  let optionsCounter = [[], [], [], ["Software", "Hardware"]];
  let optionsAlarm = [[], [], [], [], [], [], [], ["ACTION_ACTIVATETASK", "ACTION_SETEVENT", "ACTION_ALARMCALLBACK"], [], [], []];
  let variablesAlarm = [counterID, alarmID, maxValue, ticksPerBase, minimumCycle, start, cycle, alarmAction, taskID, eventMask, autostart];
  let variablesResource = [resourceID, resourceProperty];
  let optionsResource = [[], ["STANDARD", "LINKED", "INTERNAL"]];



  return (
    // <div className="container mt-5">
    <div className='container'>

      <div className='header'>
        <div className='image'>
          <img src="autopia.png" alt="autopia" className="logo" ></img>
        </div>

        <div className='links'>
          <div className='image'>
            <a href="https://kanndil.github.io/multicoreOS-HW-TC/"><img src="document.png" alt="documentation" className="book" ></img></a>
          </div>
          <div className='image'>
            <a href="https://github.com/kanndil/multicoreOS-HW-TC"><img src="github.svg" alt="autopia" className="github" ></img></a>
          </div>
        </div>

      </div>
      

      <div className='bodycontainer'>

      <div className='sidebar'> 

            <button className="button-int" role="button" onClick={()=>{
              setPressed(0);
            }}>Task</button>
            <button className="button-int" role="button"onClick={()=>{
              setPressed(1);
            }}>Interrupt</button>
            <button className="button-int" role="button"onClick={()=>{
              setPressed(2);
            }}>Counter</button>
            <button className="button-int" role="button"onClick={()=>{
              setPressed(3);
            }}>Alarm</button>
            <button className="button-int" role="button"onClick={()=>{
              setPressed(4);
            }}>Resource</button>
              <button className="button-int2" role="button"onClick={()=>{

                let tasks = [];
                let interrupts = [];
                let counters = [];
                let resources = [];

                for (let i = 0; i < tasksList.length; i++) {
                  for (let j = 0; j < tasksList[i].length; j++) {
                    tasks.push(tasksList[i][j]);
                  }
                }

                for (let i = 0; i < interruptsList.length; i++) {
                  for (let j = 0; j < interruptsList[i].length; j++) {
                    interrupts.push(interruptsList[i][j]);
                  }
                }

                for (let i = 0; i < countersList.length; i++) {
                  for (let j = 0; j < countersList[i].length; j++) {
                    counters.push(countersList[i][j]);
                  }
                }

                for (let i = 0; i < resourcesList.length; i++) {
                  resources.push(resourcesList[i]);
                }

                let data = {
                  tasks: tasks,
                  isrs: interrupts,
                  resources: resources,
                  counters: counters
                };

                console.log(data);
                // download a json file with the data
                const element = document.createElement("a");
                const file = new Blob([JSON.stringify(data, null, 2)], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = "data.json";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();

                fetch("http://127.0.0.1:5000/addJson", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });


              
            }}>Download</button>

      </div>




      <div className='content'> 

      {pressed === 0 &&
      <div className='title'>
        <h1>Task Attributes</h1>
      </div>
      }


      {pressed === 0 && labelList.map((label, index) => (
        <div className="form__group field" key={index}>
          { [0, 1, 2, 3,7, 8].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setTaskID(e.target.value);
                  break;
                case 2:
                  setPriority(e.target.value);
                  break;
                case 3:
                  setHandleName(e.target.value);
                  break;
                case 4:
                  setTaskState(e.target.value);
                  break;
                case 5:
                  setSchedule(e.target.value);
                  break;
                case 6:
                  setVersion(e.target.value);
                  break;
                case 7:
                  setMaxActivation(e.target.value);
                  break;
                case 8:
                  setResourcesUsed(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![0, 1, 2, 3,7, 8].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setTaskID(e.target.value);
                  break;
                case 2:
                  setPriority(e.target.value);
                  break;
                case 3:
                  setHandleName(e.target.value);
                  break;
                case 4:
                  setTaskState(e.target.value);
                  break;
                case 5:
                  setSchedule(e.target.value);
                  break;
                case 6:
                  setVersion(e.target.value);
                  break;
                case 7:
                  setMaxActivation(e.target.value);
                  break;
                case 8:
                  setResourcesUsed(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>

            {options[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

      {pressed ===
      0 && <div className="newbutton">
          <button id="btn" onClick={() => {
            console.log("button clicked");
            const btn = document.querySelector("#btn");
            const btnText = document.querySelector("#btnText");

            // check if all the fields are filled
            for (let i = 0; i < variables.length; i++) {
              if (variables[i] === -1 || variables[i] === "") {
                console.log("Field not filled is " + labelList[i]);
                btnText.innerHTML = "Fill all the fields!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }

            {
              // check that coreid, taskid, priority, and max activation are integers
              if (!Number.isInteger(parseInt(appID)) ) {
                btnText.innerHTML = "Core ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

              if (!Number.isInteger(parseInt(taskID)) ) {
                btnText.innerHTML = "Task ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

              if (!Number.isInteger(parseInt(priority)) ) {
                btnText.innerHTML = "Priority must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

              if (!Number.isInteger(parseInt(maxActivation)) ) {
                btnText.innerHTML = "Max Activation must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            }

            // check if the task id is unique
            for (let i = 0; i < tasksList.length; i++) {
              for (let j = 0; j < tasksList[i].length; j++) {
                if (tasksList[i][j].TaskID === taskID) {
                  btnText.innerHTML = "Task ID already exists!";
                  let old = btnText.style.color;
                  btnText.style.color = "black";
                  btn.classList.add("reject");
                  setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                  }, 3000);
                  return;
                }
              }
            }

            // check that app id is between 0 and 5
            if (appID < 0 || appID > 5) {
              btnText.innerHTML = "App ID must be between 0 and 5!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }


            let resources = resourcesUsed.split(",");
            for (let i = 0; i < resources.length; i++) {
              resources[i] = parseInt(resources[i]);
            }

            let task = {
              osAppId: parseInt(appID),
              TaskID: parseInt(taskID),
              priority: parseInt(priority),
              handleName: handleName,
              TaskState: taskState,
              SCHEDULE: schedule,
              VERSION: version,
              activationMax: parseInt(maxActivation),
              resourcesUsed: resources
            };

            let temp = tasksList;
            temp[appID].push(task);
            setTasksList(temp);
            
            setAppID(-1);
            setTaskID(-1);
            setPriority(-1);
            setHandleName("");
            setTaskState("");
            setSchedule("");
            setVersion("");
            setMaxActivation(-1);
            setResourcesUsed([]);
            console.log(tasksList);

            // remove the value from the input fields
            
            for (let i = 0; i < variables.length; i++) {
              document.querySelectorAll(".form__field")[i].value = "";
            }

            


            btnText.innerHTML = "Task Added!";
            btn.classList.add("active");
            setTimeout(function () {
              btn.classList.remove("active");
              btnText.innerHTML = "Add";
            }, 3000);
          }
          }>
              <p id="btnText">Add</p>
              <div className="check-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />        
                  </svg>
              </div>
          </button>
      </div>
      }


      {pressed === 1 &&
      <div className='title'>
        <h1>Interrupt Attributes</h1>
        </div>
      }

      {pressed === 1 && labelListInterrupt.map((label, index) => (
        <div className="form__group field" key={index}>
          { [0, 1, 2].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setPriority(e.target.value);
                  break;
                case 2:
                  setHandleName(e.target.value);
                  break;
                case 3:
                  setIsrCat(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![0, 1, 2].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setPriority(e.target.value);
                  break;
                case 2:
                  setHandleName(e.target.value);
                  break;
                case 3:
                  setIsrCat(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>
            {optionsInterrupt[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

    {pressed === 1 && isrCat === "CAT2" && labelListCat2.map((label, index) => (
        <div className="form__group field" key={index}>
          { [2, 3].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setSchedule(e.target.value);
                  break;
                case 1:
                  setVersion(e.target.value);
                  break;
                case 2:
                  setMaxActivation(e.target.value);
                  break;
                case 3:
                  setResourcesUsed(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![2, 3].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setSchedule(e.target.value);
                  break;
                case 1:
                  setVersion(e.target.value);
                  break;
                case 2:
                  setMaxActivation(e.target.value);
                  break;
                case 3:
                  setResourcesUsed(e.target.value);
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>
            {optionsCat2[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

      {pressed ===
      1 && <div className="newbutton">
          <button id="btnInt" onClick={() => {
            const btn = document.querySelector("#btnInt");
            const btnText = document.querySelector("#btnIntText");

            // check if all the fields are filled
            for (let i = 0; i < variablesInterrupt.length; i++) {
              if (variablesInterrupt[i] === -1 || variablesInterrupt[i] === "") {
                console.log("Field not filled is " + labelListInterrupt[i]);
                btnText.innerHTML = "Fill all the fields!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }

            
            // check that coreid, taskid, priority, and max activation are integers
            if (!Number.isInteger(parseInt(appID)) ) {
              btnText.innerHTML = "Core ID must be an integer!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }

              if (!Number.isInteger(parseInt(priority)) ) {
                btnText.innerHTML = "Priority must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            // check if the priority is unique for a given core
            for (let i = 0; i < interruptsList[appID].length; i++) {
              if (interruptsList[appID][i].priority === priority) {
                btnText.innerHTML = "Priority already exists for this core!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }

            // check that app id is between 0 and 5
            if (appID < 0 || appID > 5) {
              btnText.innerHTML = "App ID must be between 0 and 5!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }

            if (isrCat === "CAT2") {
              // check that max activation is an integer
              if (!Number.isInteger(parseInt(maxActivation)) ) {
                btnText.innerHTML = "Max Activation must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
              // check that all cat2 fields are filled
              for (let i = 0; i < variablesCat2.length; i++) {
                if (variablesCat2[i] === -1 || variablesCat2[i] === "") {
                  console.log("Field not filled is " + labelListCat2[i]);
                  btnText.innerHTML = "Fill all the fields!";
                  let old = btnText.style.color;
                  btnText.style.color = "black";
                  btn.classList.add("reject");
                  setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                  }, 3000);
                  return;
                }
              }
            }



            let ISR = {
              osAppId: parseInt(appID),
              priority: parseInt(priority),
              Interrupt_Handler: handleName,
              isr_cat: isrCat === "CAT1" ? parseInt(1) : parseInt(2)
            };

            if (isrCat === "CAT2") {
              ISR.SCHEDULE = schedule;
              ISR.VERSION = version;
              ISR.activationMax = parseInt(maxActivation);
              let resources = resourcesUsed.split(",");
              for (let i = 0; i < resources.length; i++) {
                resources[i] = parseInt(resources[i]);
              }
              ISR.resourcesUsed = resources;
            }

            let temp = interruptsList;
            temp[appID].push(ISR);
            setInterruptsList(temp);
            
            setAppID(-1);
            setPriority(-1);
            setHandleName("");
            setIsrCat("");
            if (isrCat === "CAT2"){
              setSchedule("");
              setVersion("");
              setMaxActivation(-1);
              setResourcesUsed([]);
            }

            console.log(tasksList);

            // remove the value from the input fields
            
            for (let i = 0; i < variablesInterrupt.length; i++) {
              document.querySelectorAll(".form__field")[i].value = "";
            }
            
            if (isrCat === "CAT2"){
              for (let i = 0; i < variablesCat2.length; i++) {
                document.querySelectorAll(".form__field")[i + 4].value = "";
              }
            }

            btnText.innerHTML = "ISR Added!";
            btn.classList.add("active");
            setTimeout(function () {
              btn.classList.remove("active");
              btnText.innerHTML = "Add";
            }, 3000);
          }
          }>
              <p id="btnIntText">Add</p>
              <div className="check-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />        
                  </svg>
              </div>
          </button>
      </div>
      }

      {pressed === 2 &&
      <div className='title'>
        <h1>Counter Attributes</h1>
        </div>
      }

      {pressed === 2 && labelListCounter.map((label, index) => (
        <div className="form__group field" key={index}>
          { [0, 1, 2].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setCounterID(e.target.value);
                  break;
                case 2:
                  setMaxValue(e.target.value);
                  break;
                case 3:
                  setCounterVersion(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![0, 1, 2].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setAppID(e.target.value);
                  break;
                case 1:
                  setCounterID(e.target.value);
                  break;
                case 2:
                  setMaxValue(e.target.value);
                  break;
                case 3:
                  setCounterVersion(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>
            {optionsCounter[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

    {pressed ===
      2 && <div className="newbutton">
          <button id="btnCnt" onClick={() => {
            const btn = document.querySelector("#btnCnt");
            const btnText = document.querySelector("#btnCntText");

            // check if all the fields are filled
            for (let i = 0; i < variablesCounter.length; i++) {
              if (variablesCounter[i] === -1 || variablesCounter[i] === "") {
                console.log("Field not filled is " + labelListCounter[i]);
                btnText.innerHTML = "Fill all the fields!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }

            
            // check that coreid, taskid, priority, and max activation are integers
            if (!Number.isInteger(parseInt(appID)) ) {
              btnText.innerHTML = "Core ID must be an integer!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }

              if (!Number.isInteger(parseInt(maxValue)) ) {
                btnText.innerHTML = "Max Value must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            
              if (!Number.isInteger(parseInt(counterID)) ) {
                btnText.innerHTML = "Counter ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            // check if the counterID is unique
            // check if the task id is unique
            for (let i = 0; i < countersList.length; i++) {
              for (let j = 0; j < countersList[i].length; j++) {
                if (countersList[i][j].counter_id === counterID) {
                  btnText.innerHTML = "Counter ID already exists!";
                  let old = btnText.style.color;
                  btnText.style.color = "black";
                  btn.classList.add("reject");
                  setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                  }, 3000);
                  return;
                }
              }
            }
            

            // check that app id is between 0 and 5
            if (appID < 0 || appID > 5) {
              btnText.innerHTML = "App ID must be between 0 and 5!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }


            let Counter = {
              osAppId: parseInt(appID),
              counter_id: parseInt(counterID),
              maxAllowedValue: parseInt(maxValue),
              version: counterVersion,
              Alarms: []
            };


            let temp = countersList;
            temp[appID].push(Counter);
            setCountersList(temp);
            
            setAppID(-1);
            setCounterID(-1);
            setMaxValue("");
            setCounterVersion("");

            // remove the value from the input fields
            for (let i = 0; i < variablesCounter.length; i++) {
              document.querySelectorAll(".form__field")[i].value = "";
            }
            

            btnText.innerHTML = "Counter Added!";
            btn.classList.add("active");
            setTimeout(function () {
              btn.classList.remove("active");
              btnText.innerHTML = "Add";
            }, 3000);
          }
          }>
              <p id="btnCntText">Add</p>
              <div className="check-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />        
                  </svg>
              </div>
          </button>
      </div>
      }

      {pressed === 3 &&
      <div className='title'>
        <h1>Alarm Attributes</h1>
        </div>
      }

      {pressed === 3 && labelListAlarm.map((label, index) => (
        <div className="form__group field" key={index}>
          { [0, 1, 2, 3, 4, 5, 6, 8, 9, 10].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setCounterID(e.target.value);
                  break;
                case 1:
                  setAlarmID(e.target.value);
                  break;
                case 2:
                  setMaxValue(e.target.value);
                  break;
                case 3:
                  setTicksPerBase(e.target.value);
                  break;
                case 4:
                  setMinimumCycle(e.target.value);
                  break;
                case 5:
                  setStart(e.target.value);
                  break;
                case 6:
                  setCycle(e.target.value);
                  break;
                case 7:
                  setAlarmAction(e.target.value);
                  break;
                case 8:
                  setTaskID(e.target.value);
                  break;
                case 9:
                  setEventMask(e.target.value);
                  break;
                case 10:
                  setAutostart(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![0, 1, 2, 3, 4, 5, 6, 8, 9, 10].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setCounterID(e.target.value);
                  break;
                case 1:
                  setAlarmID(e.target.value);
                  break;
                case 2:
                  setMaxValue(e.target.value);
                  break;
                case 3:
                  setTicksPerBase(e.target.value);
                  break;
                case 4:
                  setMinimumCycle(e.target.value);
                  break;
                case 5:
                  setStart(e.target.value);
                  break;
                case 6:
                  setCycle(e.target.value);
                  break;
                case 7:
                  setAlarmAction(e.target.value);
                  break;
                case 8:
                  setTaskID(e.target.value);
                  break;
                case 9:
                  setEventMask(e.target.value);
                  break;
                case 10:
                  setAutostart(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>
            {optionsAlarm[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

    {pressed ===
      3 && <div className="newbutton">
          <button id="btnAlr" onClick={() => {
            const btn = document.querySelector("#btnAlr");
            const btnText = document.querySelector("#btnAlrText");

            // check if all the fields are filled
            for (let i = 0; i < variablesAlarm.length; i++) {
              if (variablesAlarm[i] === -1 || variablesAlarm[i] === "") {
                console.log("Field not filled is " + labelListAlarm[i]);
                btnText.innerHTML = "Fill all the fields!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }



            
            // check that coreid, taskid, priority, and max activation are integers
            if (!Number.isInteger(parseInt(counterID)) ) {
              btnText.innerHTML = "Core ID must be an integer!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }

            if (!Number.isInteger(parseInt(alarmID)) ) {
                btnText.innerHTML = "Alarm ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }


              if (!Number.isInteger(parseInt(maxValue)) ) {
                btnText.innerHTML = "Max Value must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            if (!Number.isInteger(parseInt(ticksPerBase)) ) {
                btnText.innerHTML = "Ticks Per Base must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            if (!Number.isInteger(parseInt(minimumCycle)) ) {
                btnText.innerHTML = "Minimum Cycle must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }

            
              if (!Number.isInteger(parseInt(start)) ) {
                btnText.innerHTML = "Start ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }

            if (!Number.isInteger(parseInt(cycle)) ) {
                btnText.innerHTML = "Cycle must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }

            if (!Number.isInteger(parseInt(taskID)) ) {
                btnText.innerHTML = "Task ID must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }

            if (!Number.isInteger(parseInt(eventMask)) ) {
                btnText.innerHTML = "Event Mask must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }

            if (!Number.isInteger(parseInt(autostart)) ) {
                btnText.innerHTML = "Autostart must be an integer!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }




            // check if the counterID corresponds to a counter in countersList
            let found = false;
            for (let i = 0; i < countersList.length; i++) {
                for (let j = 0; j < countersList[i].length; j++) {
                    if (countersList[i][j].counter_id === parseInt(counterID)) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                btnText.innerHTML = "Counter ID does not exist!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                }, 3000);
                return;
            }



            // check if the Alarm id is unique
            for (let i = 0; i < countersList.length; i++) {
              for (let j = 0; j < countersList[i].length; j++) {
                for (let k = 0; k < countersList[i][j].Alarms.length; k++) {
                  if (countersList[i][j].Alarms[k].AlarmID === alarmID) {
                    btnText.innerHTML = "Alarm ID already exists!";
                    let old = btnText.style.color;
                    btnText.style.color = "black";
                    btn.classList.add("reject");
                    setTimeout(function () {
                      btn.classList.remove("reject");
                      btnText.innerHTML = "Add";
                      btnText.style.color = old;
                    }, 3000);
                    return;
                  }
                }
              }
            }
            


            let Alarm = {
              AlarmID: parseInt(alarmID),
              AlarmBase: {
                maxAllowedValue: parseInt(maxValue),
                ticksPerBase: parseInt(ticksPerBase),
                minCycle: parseInt(minimumCycle)
              },
              Start: parseInt(start),
              Cycle: parseInt(cycle),
              Action: alarmAction,
              TaskID: parseInt(taskID),
              EventMask: parseInt(eventMask),
              Autostart: parseInt(autostart),
              AppModeType: parseInt(0),
              Callback: "NULL"
            };


            let temp = countersList.map((arr) => arr.map((obj) => ({...obj})));
            let appID2 = -1;
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].length; j++) {
                    if (temp[i][j].counter_id === parseInt(counterID)) {
                    temp[i][j].Alarms.push(Alarm);
                    appID2 = i;
                    break;
                    }
                }
            }
            setCountersList(temp);

            let Alarm2 = {
              AlarmID: parseInt(alarmID),
              CounterID: parseInt(counterID),
            };

            let temp2 = alarmsList;
            console.log(temp2);
            console.log(appID2);
            temp2[appID2].push(Alarm2);
            setAlarmsList(temp2);
            
            setCounterID(-1);
            setAlarmID(-1);
            setMaxValue(-1);
            setTicksPerBase(-1);
            setMinimumCycle(-1);
            setStart(-1);
            setCycle(-1);
            setAlarmAction("");
            setTaskID(-1);
            setEventMask(-1);
            setAutostart(-1);



            // remove the value from the input fields
            for (let i = 0; i < variablesAlarm.length; i++) {
              document.querySelectorAll(".form__field")[i].value = "";
            }
            

            btnText.innerHTML = "Counter Added!";
            btn.classList.add("active");
            setTimeout(function () {
              btn.classList.remove("active");
              btnText.innerHTML = "Add";
            }, 3000);
          }
          }>
              <p id="btnAlrText">Add</p>
              <div className="check-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />        
                  </svg>
              </div>
          </button>
      </div>
      }


    {pressed === 4 &&
      <div className='title'>
        <h1>Resource Attributes</h1>
        </div>
      }

      {pressed === 4 && labelListResource.map((label, index) => (
        <div className="form__group field" key={index}>
          { [0].includes(index) && 
          <input
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setResourceID(e.target.value);
                  break;
                case 1:
                  setResourceProperty(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          />}

        { ![0].includes(index) && 
          <select
            type="input"
            className="form__field"
            placeholder={label}
            name={label}
            id={label}
            onChange={(e) => {
              // use set function to update the state
              switch (index) {
                case 0:
                  setResourceID(e.target.value);
                  break;
                case 1:
                  setResourceProperty(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            required
          >
            <option style={{   backgroundColor: '#282c34' }} value="">Select an option</option>
            {optionsResource[index].map((option, index) => (
              <option style={{   backgroundColor: '#282c34' }}value={option} key={index}>
                {option}
              </option>
            ))}
            </select>}
          
          <label htmlFor={label} className="form__label">
            {label}
          </label>
        </div>
      ))}

    {pressed ===
      4 && <div className="newbutton">
          <button id="btnRes" onClick={() => {
            const btn = document.querySelector("#btnRes");
            const btnText = document.querySelector("#btnResText");

            // check if all the fields are filled
            for (let i = 0; i < variablesResource.length; i++) {
              if (variablesResource[i] === -1 || variablesResource[i] === "") {
                console.log("Field not filled is " + labelListResource[i]);
                btnText.innerHTML = "Fill all the fields!";
                let old = btnText.style.color;
                btnText.style.color = "black";
                btn.classList.add("reject");
                setTimeout(function () {
                  btn.classList.remove("reject");
                  btnText.innerHTML = "Add";
                  btnText.style.color = old;
                }, 3000);
                return;
              }
            }

            
            if (!Number.isInteger(parseInt(resourceID)) ) {
              btnText.innerHTML = "Core ID must be an integer!";
              let old = btnText.style.color;
              btnText.style.color = "black";
              btn.classList.add("reject");
              setTimeout(function () {
                btn.classList.remove("reject");
                btnText.innerHTML = "Add";
                btnText.style.color = old;
              }, 3000);
              return;
            }


            // check if the resource is unique
            for (let i = 0; i < resourcesList.length; i++) {
                if (resourcesList[i].resource_id === resourceID) {
                  btnText.innerHTML = "Resource ID already exists!";
                  let old = btnText.style.color;
                  btnText.style.color = "black";
                  btn.classList.add("reject");
                  setTimeout(function () {
                    btn.classList.remove("reject");
                    btnText.innerHTML = "Add";
                    btnText.style.color = old;
                  }, 3000);
                  return;
                }
            }
            

            let Resource = {
              resource_id: parseInt(resourceID),
              resource_property: resourceProperty,
            };


            let temp = resourcesList;
            temp.push(Resource);
            setResourcesList(temp);
            
            setResourceID(-1);
            setResourceProperty("");

            // remove the value from the input fields
            for (let i = 0; i < variablesResource.length; i++) {
              document.querySelectorAll(".form__field")[i].value = "";
            }
            

            btnText.innerHTML = "Resource Added!";
            btn.classList.add("active");
            setTimeout(function () {
              btn.classList.remove("active");
              btnText.innerHTML = "Add";
            }, 3000);
          }
          }>
              <p id="btnResText">Add</p>
              <div className="check-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />        
                  </svg>
              </div>
          </button>
      </div>
      }


      </div>

      <div className='content'>
        {/* This div will have a list with all the tasks  */}

        {pressed==0 &&
        <div className='title'>
          <h1>Tasks List</h1>
        </div>}

        {pressed == 0 &&
        <div className='taskList'>
          
         {/* Put tasks with different appids in separate rows */}

          {tasksList.map((app, index) => (
            <div className='taskRow' key={index}>
              <div className='taskAppID'>
                <h2>Core ID: {index}</h2>
              </div>
              {/* Sort app by priority */}

              {app.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    let taskID = parseInt(e.currentTarget.querySelector(".number").innerHTML);
                    const updatedTasksList = tasksList.map((taskArr, idx) => {
                      if (idx === index) {
                        return taskArr.filter((t) => t.TaskID !== taskID);
                      }
                      return taskArr;
                    });
            
                    // Update the state with the new array
                    setTasksList(updatedTasksList);
                  }}>
                    {/* make the text white */}
                      <div className='task'>

                        
                        <p className='text'>{task.handleName}</p>

                        <div className="taskProperties">
                          <div className="circle">
                            <span className="number">{task.TaskID}</span>
                          </div>

                          <div className="star">
                            <p className='rotate-text'>{task.priority}</p>
                          </div>
                        </div>

                      </div>
    
                  </div>
                    ))}

              
            </div>
          ))}

        </div>}


        {pressed==1 &&
        <div className='title'>
          <h1>ISRs List</h1>
        </div>}

        {pressed == 1 &&
        <div className='taskList'>
          
         {/* Put tasks with different appids in separate rows */}

          {interruptsList.map((app, index) => (
            <div className='taskRow' key={index}>
              <div className='taskAppID'>
                <h2>Core ID: {index}</h2>
              </div>
              {/* Sort app by priority */}

              {app.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    console.log(e.currentTarget);

                    let priority = parseInt(e.currentTarget.querySelector(".rotate-text").innerHTML);
                    const updatedTasksList = interruptsList.map((taskArr, idx) => {
                      if (idx === index) {
                        return taskArr.filter((t) => t.priority !== priority);
                      }
                      return taskArr;
                    });
            
                    // // Update the state with the new array
                    setInterruptsList(updatedTasksList);
                  }}>
                    {/* make the text white */}
                      <div className='task'>

                        
                        <p className='text'>{task.Interrupt_Handler}</p>

                        <div className="taskProperties">
                          <div className="star">
                            <p className='rotate-text'>{task.priority}</p>
                          </div>
                        </div>

                      </div>
    
                  </div>
                    ))}

              
            </div>
          ))}

        </div>}


        {pressed == 2 &&
        <div className='title'>
          <h1>Counters List</h1>
        </div>}

        {pressed == 2 &&
        <div className='taskList'>
          
         {/* Put tasks with different appids in separate rows */}

          {countersList.map((app, index) => (
            <div className='taskRow' key={index}>
              <div className='taskAppID'>
                <h2>Core ID: {index}</h2>
              </div>
              {/* Sort app by priority */}

              {app.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    let counterID = parseInt(e.currentTarget.querySelector(".number").innerHTML);
                    const updatedTasksList = countersList.map((taskArr, idx) => {
                      if (idx === index) {
                        return taskArr.filter((t) => t.counter_id !== counterID);
                      }
                      return taskArr;
                    });
            
                    // Update the state with the new array
                    setCountersList(updatedTasksList);
                  }}>
                    {/* make the text white */}
                      <div className='task'>

                        
                        <p className='text'>{task.version}</p>

                        <div className="taskProperties">
                          <div className="circle">
                            <span className="number">{task.counter_id}</span>
                          </div>
                        </div>

                      </div>
    
                  </div>
                    ))}

              
            </div>
          ))}

        </div>}


        {pressed == 3 &&
        <div className='title'>
          <h1>Alarms List</h1>
        </div>}

        {pressed == 3 &&
        <div className='taskList'>
          
         {/* Put tasks with different appids in separate rows */}

          {alarmsList.map((app, index) => (
            <div className='taskRow' key={index}>
              <div className='taskAppID'>
                <h2>Core ID: {index}</h2>
              </div>
              {/* Sort app by priority */}

              {app.sort((a, b) => (parseInt(a.CounterID) > parseInt(b.CounterID)) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    let AlarmID = parseInt(e.currentTarget.querySelector(".number").innerHTML);
                    const updatedTasksList = alarmsList.map((taskArr, idx) => {
                      if (idx === index) {
                        return taskArr.filter((t) => t.AlarmID !== AlarmID);
                      }
                      return taskArr;
                    });
            
                    // Update the state with the new array
                    setAlarmsList(updatedTasksList);
                  }}>
                    {/* make the text white */}
                      <div className='task'>

                        
                        {/* <p className='text'>{task.version}</p> */}

                        <div className="taskProperties">
                        <div className="circle">
                            <span className="number">{task.AlarmID}</span>
                          </div>

                          <div className="star">
                            <p className='rotate-text'>{task.CounterID}</p>
                          </div>
                        </div>

                      </div>
    
                  </div>
                    ))}

              
            </div>
          ))}

        </div>}

        {pressed == 4 &&<div className='Resource'> 
        <div className='title'>
          <h1>Resources List</h1>
        </div>
        <div className='taskList'>
          
         {/* Put tasks with different appids in separate rows */}

          
         <div className="grid">

              {resourcesList.sort((a, b) => (parseInt(a.resource_id) > parseInt(b.resource_id)) ? 1 : -1).map((res, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    let ResourceID = parseInt(e.currentTarget.querySelector(".number").innerHTML);
                    let updatedResoucesList = [];
                    for (let i = 0; i < resourcesList.length; i++) {
                      if (resourcesList[i].resource_id !== ResourceID) {
                        updatedResoucesList.push(resourcesList[i]);
                      }
                    }
                    // Update the state with the new array
                    setResourcesList(updatedResoucesList);
                  }}>
                    {/* make the text white */}
                      <div className='task'>

                        
                        <p className='text'>{res.resource_property}</p>

                        <div className="taskProperties">
                        <div className="circle">
                            <span className="number">{res.resource_id}</span>
                          </div>
                        </div>

                      </div>
    
                  </div>
                    ))}

          </div>

        </div>
        </div>}



        
      </div>

      </div>


  
    </div>
      
  
  );
}

export default MainPage;
