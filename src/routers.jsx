import React from 'react';
import { Route } from 'react-router';
export default (
    <Route>
        <Route path='/ranking' />
        <Route path='/mint-nft' />
        <Route path='/explore' />
        <Route path='/collection/:id' />
        <Route path='/nft/:id' />
        <Route path='/ino/:id' />
        <Route path='/profile/:id' />
        <Route path='/edit-profile/:id' />
        <Route path='/verify-account/:id' />
    </Route>
);