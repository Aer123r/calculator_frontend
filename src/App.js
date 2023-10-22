import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import List from './components/List'
import { useState, useEffect } from "react";
import "./App.css"
const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const btnValuesSci = [
  ["exp(", "(", ")", "C", "/"],
  [, "pow(", "ceil(", '7', '8', '9', "*"],
  ["floor(", "cot(", '4', '5', '6', "-"],
  ["sin(", "cos(", , '1', '2', '3', "+"],
  ["Ans", "tan(", '0', ".", "="],
];


const evaluateExpression = function (expression) {
  expression = expression.replace(/log/g, "Math.log");
  expression = expression.replace(/exp/g, "Math.exp");
  expression = expression.replace(/pow/g, "Math.pow");
  expression = expression.replace(/round/g, "Math.round");
  expression = expression.replace(/floor/g, "Math.floor");
  expression = expression.replace(/ceil/g, "Math.ceil");
  expression = expression.replace(/sqrt/g, "Math.sqrt");
  expression = expression.replace(/sqrt/g, "Math.sqrt");
  expression = expression.replace(/sin/g, "Math.sin");
  expression = expression.replace(/cos/g, "Math.cos");
  expression = expression.replace(/tan/g, "Math.tan");
  expression = expression.replace(/cot/g, "Math.cot");
  return eval(expression);
}


const App = () => {
  const [expression, setExpression] = useState('0');
  const [res,setRes] = useState("");
  const [clearRes,setClearRes] = useState(false);
  const [scientificMode, setScientficMode] = useState(true)
  const [historyRes,setHistoryRes] = useState([]);
  const appendToExp = function (value) {
    let exp = expression;
    if(exp === "0" || clearRes ){
      exp = ""
      setClearRes(false)
    }
    if(exp === 'Error'){
      exp = value;
    }else {
      exp += value;
    }
    setExpression(exp);
    console.log(expression);
  }

  const calcRes = function(){
    try {
      const result = evaluateExpression(expression);
      setRes(result);
      setClearRes(true);
      setHistoryRes(()=>{
        return [{"exp":expression,"res":result},...historyRes]
      });

    }catch(error) {
      setRes('Error')
      setClearRes(true);
      setTimeout(()=>{
        setRes('0')
      },1500)
    }
  }

  const showHistoryRes = ()=> {
    setExpression(historyRes[0].value)
    setClearRes(true);
  }
  const handleButtonClick = (value) => {
    if(value === 'C') {
      setExpression('0')
      setClearRes(false);
    }else if(value === '='){
      calcRes();
    }else if(value === 'Ans'){
      showHistoryRes();
    }
    else {
      appendToExp(value);
    }
  }
  useEffect(() => {
    console.log(historyRes)
  }, historyRes)
  return (
    <>

      {/* <button className="modeBtn" onClick={() => { setScientficMode(!scientificMode) }}>{scientificMode ? 'SCI' : 'SMPL'}</button> */}

      <Wrapper>

        <Screen value={clearRes ? res: expression} />
        <div className="Box">

          <ButtonBox>
            {
              (scientificMode ? btnValuesSci : btnValues).map((row, rowIndex) => {
                return (
                  <div key={rowIndex} className="rowBtnGroup">
                    {row.map((btn, colIndex) => {
                      return (
                        <Button
                          value={btn}
                          key={colIndex}
                          className={btn === "=" || btn === 'exp(' ? "equals" : ""}
                          onClick={() => {
                            handleButtonClick(btn)
                          }}
                        />
                      )
                    })}
                  </div>
                )

              })
            }
          </ButtonBox>
          <List data={historyRes}></List>
        </div>
      </Wrapper>
    </>
  );
};



export default App;