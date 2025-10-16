import VariablesAndConstants from "./VariablesAndConstants"
import VariableTypes from "./VariableTypes"
import BooleanVariables from "./BooleanVariables"
import IfElse from "./IfElse"
import TernaryOperator from "./TernaryOperator"
import ConditionalOutputIfElse from "./ConditionalOutputIfElse"
import ConditionalOutputInline from "./ConditionalOutputInline"
import LegacyFunctions from "./LegacyFunctions"
import ArrowFunctions from "./ArrowFunctions"
import ImpliedReturn from "./ImpliedReturn"
import TemplateLiterals from "./TemplateLiterals"
import SimpleArrays from "./SimpleArrays"
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays"
import MapFunction from "./MapFunction"
import ForLoops from "./ForLoops"
import FindFunction from "./FindFunction"
import FilterFunction from "./FilterFunction"
import JsonStringify from "./JsonStringify"
import House from "./House"
import Spreading from "./Spreader"
import Destructing from "./Destructing"
import FunctionDestructing from "./FunctionDestructing"
import DestructingImports from "./DestructingImports"
import Classes from "./Classes"
import Styles from "./Styles"
import Add from "./Add"
import Square from "./Square"
import Highlight from "./Highlight"
import PathParameters from "./PathParameters"

export default function Lab3() {
  console.log("Hello world!")
  return (
    <div>
      <h3>Lab 3</h3>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>
      <PathParameters />
    </div>
  )
}