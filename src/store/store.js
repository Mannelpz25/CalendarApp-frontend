/* ---------- Ayuda!! ----------
*    Store de REDUX
*/
//-Importaciones:
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

//-Contenido:
export const store = configureStore({
    reducer:{
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})