import React from 'react';
const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State = void> {
  initialState: State;
  children: React.ReactNode;
}

export interface Container<Value,State=void> {
  Provider:React.Component<ContainerProviderProps<State>>;
  useContainer: ()=>value;
}

export function createContainer<Value,State=void>(
  useHook:(initialState?:State) => value
):Container<Value,State>{
  let ctx=React.createContext<Value|typeof EMPTY>(EMPTY);
  
  function Provider(props:ContainerProviderProps<State){
    let value=useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }
}