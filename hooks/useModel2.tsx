import React from 'react';

const EMPTY: unique symbol = Symbol;

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.React.ReactNode;
}

export interface Container<Value, State = void> {
  Provider: React.Component<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State = void>(useHook: (initialState: Value) => Value): Container<Value, State> {
  let Context = React.createContext<Value | typeof EMPTY>(EMPTY);

  function Provider(props:ContainerProviderProps<State>){
    let value=useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}></Context.Provider>
  }
  
  function useContainer():Value{
    let value=React.useContext(Context);
    return value
  }

  return {Provider,useContainer}


}

export function useContainer<Value,State=void>(container:Container<Value,State>):Value{
  return container.useContainer()
}