/**
 * https://github.com/jamiebuilds/unstated-next
 */
import React from 'react';
const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State = void> {
  initialState: State;
  children: React.ReactNode;
}

export interface Container<Value,State=void> {
  Provider:React.ComponentType<ContainerProviderProps<State>>;
  useContainer: ()=>value;
}

export function createContainer<Value,State=void>(
  useHook:(initialState?:State) => value
):Container<Value,State>{
  let Context=React.createContext<Value|typeof EMPTY>(EMPTY);
  
  function Provider(props:ContainerProviderProps<State){
    let value=useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }
  
  function useContainer():Value{
    let value=React.useContext(Context);
    if(value===EMPTY  ){
      throw new Error('component must be wrapped  in a container');
    }
    return value;
  }

  return {Provider,useContainer };


}

// 使用方式

const useCount = (count = 0) => {
  let [count, setCount] = React.useState(initialState);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
};


let Counter = createContainer(useCounter)