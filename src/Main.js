import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Admin from './Admin'
import PrintAdmin from './PrintAdmin'
import Print from './Print'
import EventDescription from './EventDescription';
import Events from './Events'
import EventParticipation from "./EventParticipation";
import EventsAdmin from "./EventsAdmin";


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
      <Route path="/printAdmin" component={PrintAdmin} />
      <Route path="/events" component={Events}/>
      <Route path="/eventsAdmin" component={EventsAdmin} />
      <Route path="/eventParticipation" component={EventParticipation} />
      <Route path="/eventDescription" component={EventDescription} />
      <Route path='/print' component={Print}/>
    </Switch>
  </main>
)

export default Main
