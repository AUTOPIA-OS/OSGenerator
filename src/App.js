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
// create a list of the given labels






function App() {
  const [appID, setAppID] = useState(-1);
  const [taskID, setTaskID] = useState(-1);
  const [priority, setPriority] = useState(-1);
  const [handleName, setHandleName] = useState("");
  const [taskState, setTaskState] = useState("SUSPENDED");
  const [schedule, setSchedule] = useState("FULL");
  const [version, setVersion] = useState("BASIC");
  const [maxActivation, setMaxActivation] = useState(-1);
  const [resourcesUsed, setResourcesUsed] = useState([]);
  const [pressed, setPressed] = useState(0);
  const  [tasksList, setTasksList] = useState([[], [], [], [], [], []]);
  const [isrCat, setIsrCat] = useState("CAT1");
  let [interruptsList, setInterruptsList] = useState([[], [], [], [], [], []]);


  let variables = [appID, taskID, priority, handleName, taskState, schedule, version, maxActivation, resourcesUsed];
  let options = [[], [], [], [], ["SUSPENDED", "READY", "RUNNING", "WAITING"], ["FULL", "NON"], ["BASIC", "EXTENDED" ], [], []]
  let variablesInterrupt = [appID, priority, handleName, isrCat];
  let optionsInterrupt = [[], [], [], ["CAT1", "CAT2"]];
  let variablesCat2 = [schedule, version, maxActivation, resourcesUsed];
  let optionsCat2 = [ ["FULL", "NON"], ["BASIC", "EXTENDED" ], [], []];



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



            let task = {
              osAppId: appID,
              TaskID: taskID,
              priority: priority,
              handleName: handleName,
              TaskState: taskState,
              SCHEDULE: schedule,
              VERSION: version,
              activationMax: maxActivation,
              resourcesUsed: resourcesUsed
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
              osAppId: appID,
              priority: priority,
              Interrupt_Handler: handleName,
              isr_cat: isrCat
            };

            if (isrCat === "CAT2") {
              ISR.SCHEDULE = schedule;
              ISR.VERSION = version;
              ISR.activationMax = maxActivation;
              ISR.resourcesUsed = resourcesUsed;
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

              {app.sort((a, b) => (a.priority > b.priority) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    let taskID = e.currentTarget.querySelector(".number").innerHTML;
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

              {app.sort((a, b) => (a.priority > b.priority) ? 1 : -1).map((task, i) => (
                  <div className='containerbox' key={i} onContextMenu={(e) => {
                    e.preventDefault();

                    console.log(e.currentTarget);

                    let priority = e.currentTarget.querySelector(".rotate-text").innerHTML;
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


        
      </div>

      </div>


  
    </div>
      
  
  );
}

export default App;
