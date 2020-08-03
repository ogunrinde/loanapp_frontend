import React, {useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const DealProcess = () =>
{
    return (
        <Tabs>
            <TabList>
                <Tab>Disburse</Tab>
                <Tab>Repayment</Tab>
                <Tab>Over Due</Tab>

            </TabList>
        
            <TabPanel>
               <div>
                   <div style={{textAlign:'center',marginTop:50}}>
                       <button name="submit" className="connect" id="" data-submit="...Sending">Disburse </button>

                   </div>

               </div>
            </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
    );
}

export default DealProcess;