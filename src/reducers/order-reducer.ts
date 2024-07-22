import { MenuItem, OrderItem } from "../types";

/// especificamos sus acciones para el dispacth
export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

//establecemos los tipos del state
export type OrderState = {
  order: OrderItem[];
  tip: number;
};

// establecesmos los states
export const initialState = {
  order: [],
  tip: 0,
};
//establecemos el Reducer
export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let updatedOrder: OrderItem[] = []; // manejo esta variable para actulizar el order y despues lo devuelvo en return final para actualizar el state
    if (itemExist) {
      updatedOrder = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updatedOrder = [...state.order, newItem];
    }
    return {
      ...state,
      order: updatedOrder,
    };
  }
  if (action.type === "remove-item") {
    const updatedOrder = state.order.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      order: updatedOrder,
    };
  }
  if (action.type === "place-order") {
    return {
        ...state,
        order: [],
        tip:0
    };
  }
    if (action.type === "add-tip") {
      const tip = action.payload.value
      return {
          ...state,
          tip
      }
  }
  return state; //SIEMPRE TEINE QUE RETORNAR EL STATE EL REDUCER
};
