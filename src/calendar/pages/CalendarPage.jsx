/* ---------- Ayuda!! ----------
*    Pagina del calendario
*/
//-Importaciones:
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css' 
import { NavBar, CalendarEvent,CalendarModal,FabAddNew, FabDelete} from "../"
import { getMessagesES, localizer } from '../../helpers'
import { useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks' 

//-Contenido:
export const CalendarPage = () => {
    const {user} = useAuthStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
    const {openDateModal} = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
        const isSelect = isSelected;
        const style ={
            backgroundColor: isMyEvent ? (isSelect ? '#194795' : '#347CF7') :'#465660',
            borderRadios: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }
    const onSelect = (event) => {
        setActiveEvent(event);
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    useEffect(() => {
        startLoadingEvents();    
    }, [])
    

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal/>
            <FabAddNew />
            <FabDelete />
        </>
    )
}
