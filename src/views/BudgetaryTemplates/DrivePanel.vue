<template>
        <div id="proposal">
            <img src="https://i.ibb.co/whTMQS8/image.png">
            <h1>Everworks Budgetary Proposal</h1>
            <h2>{{proposalName}}</h2>
            <div id="pad"></div>
            <h3 style="text-align: right">Project: {{data.projectNum}}</h3>
            <h3 style="text-align: right">Date: {{data.date.split(" ", 4).join(' ')}}</h3>
            <div id="pad"></div>
            <h2 style="text-align: center">Prepared For</h2>
            <h3 style="text-align: center">{{data.customerName}}</h3>
            <h3 style="text-align: center">{{data.title}}</h3>
            <h3 style="text-align: center">{{data.site}}</h3>
            <div id="pad"></div>
            <h4>NOTICE</h4>
            <p style="font-style: italic">
                This document contains Everworks proprietary information and has been 
                provided for the sole purpose of evaluation. Acceptance of the document 
                constitutes agreement that the recipient shall not disclose Everworks 
                proprietary information to any third party in whole or in part, or transmit 
                any documents or copies thereof in whole or in part to any third party, 
                without the expressed written consent of Everworks, Inc.
            </p>
            <div id="panel">
                <div>
                    <PanelComponentDisplay :panel="data.panel" :panelComponents="data.panelComponents" :type="'sub'"/>
                </div>
                <div>
                    <PanelComponentDisplay :panel="data.panel" :panelComponents="data.panelComponents" :type="'enc'"/>  
                </div>
            </div>
            <div id="pad"></div>
            <div id="pad"></div>
            <div id="pad"></div>
            <h3>Introduction</h3>
            <p>
                Everworks is pleased to provide a budgetary proposal for the necessary design,
                hardware, assembly, and testing for a new {{panelDescription}}.
            </p>
            <p>
                Everworks Inc provides a full range of core competencies, and specializes in turnkey 
                automated solutions across a wide spectrum of industries. Our team consists of 
                licensed engineers, programmers, designers, and technicians with a passion for automation, 
                and committed to optimizing your manufacturing process. We invest in building long-term 
                relationships with our customers, through a data-driven understanding of their business, 
                and pride ourselves on our ability to meet aggressive project schedules while staying competitive
                in the fast-paced world of automation.
            </p>
            <img src="https://i.ibb.co/tCzm76c/image.png">
            <div id="pad"></div>
            
            <h3>Project Overview</h3>
            <h4>Summary</h4>
            <p>
                This proposal encompasses project management, engineering services, design, testing, validation 
                FAT, and product support services.
            </p>
            <p>{{systemDetails}}</p>
            <h4>Objectives</h4>
            <ul>
                <li v-for="objective in objectives" :key="objective">
                    {{objective}}
                </li>
            </ul>
            <h4>Deliverables</h4>
            <ul>
                <li v-for="deliverable in deliverables" :key="deliverable">
                    {{deliverable}}
                </li>
            </ul>
            <h3>Scope of Work</h3>
            <h4>Engineering Design Services</h4>
            <h5>Project Management</h5>
            <ul>
                <li>Single point of customer contact for team coordination</li>
                <li>Development/Maintenance of project execution plan and project schedules</li>
                <li>Organization of regular meetings as required</li>
                <ul>
                    <li>Project Kickoff</li>
                    <li>Design reviews and internal milestone checklists</li>
                    <li>Status updates</li>
                </ul>
                <li>Supervision of project scope delivery and all critical milestones</li>
                <li>Document control of all formal document submittals to customer</li>
                <ul>
                    <li>Electrical drawings for approval (require customer approval for panel build)</li>
                    <li>Electrical drawings for record (to include all red-lines from site install)</li>
                </ul>
                <li>Coordination of any engineering change notices (change orders)</li>
            </ul>
            <h5>Electrical Engineering Design</h5>
            <ul>
                <li>Development of engineered drawing package</li>
                <ul>
                    <li>AutoCAD Electrical v2019</li>
                    <li>Control panel layout (fabrication-level)</li>
                    <li>Bill of Material</li>
                    <li>Power distribution and I/O elementaries</li>
                    <li>Field device interface wiring</li>
                    <li>Heat load calculation and mitigation method</li>
                    <li>Short circuit current rating analysis</li>
                    <li>All other necessary electrical calculations</li>
                </ul>
                <li>Device I/O list</li>
            </ul>
            <!-- <h5>Controls Engineering Design</h5>
            <ul>
                <li>Development of Safety PLC Burner Management System program</li>
                <ul>
                    <li>Rockwell Studio 5000 v32</li>
                    <li>Communications protocol configuration</li>
                    <li>Synchronous I/O mapping and scaling</li>
                    <li>Process code, safety code, diagnostics, and status</li>
                    <li>Safety code (NFPA 86 compliant burner control</li>
                    <li>(Optional, limited) Interface with end-user PLC</li>
                </ul>
                <li>Development of HMI platform</li>
                <ul>
                    <li>FactoryTalk View ME Version 12</li>
                    <li>Screen design development</li>
                    <li>Alarm Development</li>
                    <li>Data server configuration</li>
                </ul>
                <li>Panel FAT, and offsite integrated testing</li>
            </ul> -->
            <h5>Everworks Project Team Coordination</h5>
            <ul>
                <li>Project kickoff and design reviews</li>
                <ul>
                    <li>Project Team review of project scope, schedule, proposed designs, deliverables, testing procedures, etc.</li>
                    <li>Peer review of electrical drawings, programs, screens, etc. at project milestones, and prior to submittal for formal customer approval</li>
                    <li>Assessment, documentation, and communication of any significant project changes/issues impacting project cost, schedule, requirements, etc.</li>
                </ul>
            </ul>
            <h5>Testing, Validation, and FAT Process</h5>
            <ul>
                <li>Provide Engineering Factory Acceptance Test (FAT) and Validation at Everworks facility in Greenville, SC</li>
                <li>Complete FAT checklist with customer to ensure all items are covered</li>
                <li>Purpose of the FAT document and process is to verify that all provided equipment meets the defined requirements, quality, specifications, etc.</li>
                <li>FAT process will conclude once all issues have been documented and resolved to Customer approval and sign off is completed</li>
                <li>Review process and documentation with Customer to ensure all items are covered</li>
            </ul>
            <h4>Engineered Equipment Delivery</h4>
            <h5>Main Control Panel</h5>
            <ul>
                <li v-for="item in equipmentList" :key="item">
                    {{item}}
                </li>
            </ul>
            <h4>Equipment Packaging and Delivery</h4>
            <h5>Equipment Packaging</h5>
            <ul>
                <li>All equipment will be placed in the proper position and secured for safe transport to customer facility</li>
                <li>All loose, removable or fragile equipment will be separated from the equipment and packaged accordingly for transport</li>
                <li>Pallets, metal strapping, plastic wrap, wood framing, etc. will be used to ensure that equipment is protected and stable</li>
                <li>All equipment will be properly tagged and associated documentation provided for receipt at customer site</li>
            </ul>
            <h5>Equipment Delivery</h5>
            <ul>
                <li>Freight forwarder shipping cost not included as part of this proposal, and to be paid by customer in-full, including any cost for insurance requirements, customs documentation, or special provisions for receipt at customer facility</li>
                <li>All equipment will be carefully loaded and secured on trucks as required to transport to customer facility</li>
                <li>Associated paperwork, insurance, Bill of Lading, etc. provided with the proper signatures</li>
            </ul>
            <h4>Spare Parts</h4>
            <h5>Project Spare Parts</h5>
            <ul>
                <li>A list of spare parts will be provided once design is complete</li> 
                <li>Cost of spare parts is NOT included in scope of this proposal</li>
                <li>Spare parts can be quoted separately upon customer request</li>
            </ul>
            <h3>Preliminary Schedule</h3>
            <table style="width:100%">
                <tr style="background: #244061; color: white">
                    <th>DATE</th>
                    <th>TASK DESCRIPTION</th>
                    <th>DURATION</th>
                </tr>
                <tr v-for="row in scheduleData" :key="row">
                    <td v-for="data in row" :key="data">
                        {{data}}
                    </td>
                </tr>
                <!-- <tr>
                    <td></td>
                    <td>Documentation Gathering and Review (Internal)</td>
                    <td>4 Days</td>
                </tr>
                <tr>
                    <td>Week 2 - 5</td>
                    <td>Project Kickoff</td>
                    <td>1 Day</td>
                </tr> -->
            </table>
            <h3>Pricing Summary</h3>
            <table style="width:100%">
                <tr style="background: #244061; color: white">
                    <th>{{proposalName}}</th>
                    <th>{{data.displayPrice.sell}}</th>
                </tr>
                <tr>
                    <td>Components and Material</td>
                    <td>{{data.displayPrice.materialSell}}</td>
                </tr>
                <tr>
                    <td>Engineering & Assembly</td>
                    <td>{{data.displayPrice.laborSell}}</td>
                </tr>
            </table>
        </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import PanelComponentDisplay from '@/components/PanelBuilder/PanelComponentDisplay'
export default {
    components: {
        PanelComponentDisplay,
    },
    props: [
        'data'
    ],
    setup(props) {
        const proposalName = ref('PowerFlex 755 Drive Panel')
        // const date = ref('June 28th, 2021')
        // const customerName = ref('Bobby Miller')
        // const employer = ref('Everworks')
        // const site = ref('North Charleston, SC')
        const panelDescription = ref('Drive Panel for a PowerFlex 755 Frame Size 1 - 4')
        const systemSummary = ref(
            'Everworks will provide a new drive panel for a PowerFlex 755. PowerFlex drive cost is not included in the price of the proposal.'
        )
        const systemDetails = ref('System details and clarifications go here.')
        systemDetails.value = ''
        
        const nemaRating = computed(()=>{
            if (props.data.panel.sections[2].options[0].choiceNum === 1) {return 'NEMA 12'}
            else {return 'NEMA 4X'}
        })

        const objectives = ref([
            'Provide a new ' + nemaRating.value + '-rated drive panel',
            // 'Compact GuardLogix PLC and Safety I/O',
        ])
        const deliverables = ref([
            'Custom engineered, fabricated, and tested drive panel (as specified)',
            'Electrical drawing package (PDF and native AutoCAD)',
            'Device I/O list',
            'IP node address list',
            'All automation device program backups and configuration files',
            'Suggested spare parts documentation',
        ])
        const equipmentList = ref([
            'Free-standing single-door enclosure, ' + nemaRating.value,
            '120VAC, 1Ph, 60Hz incoming',
            'Wired per drawings, ferruled, heat-shrink wire labeling, field terminal blocks',
            'Exterior disconnect operator, signage, pilot lights, E-stop, programming port, shelf',
            'Interior lighting, wire duct, component labels',
            'Incoming main, branch circuit, and supplementary circuit breaker/fuse protection',
        ])
        const scheduleData = ref([
            ['Week 1', 'Project Kickoff', '1 Day'],
            ['', 'Specification Review (Internal)', '4 Days'],
            ['Week 2', 'Drive Panel Design Review', '1 Week'],
            // ['','Develop HMI Screen Layout', '1 Week'],
            ['Week 3', 'Review Drive Panel Design with Customer', '1 Week'],
            // ['', 'Review HMI Screens Layout with Customer', '1 Week'],
            ['Week 4 - 6', 'Procure Parts', '3 Weeks'],
            ['', 'Assemble Panels', '2 days'],
            // ['Week 13', 'Review FAT Specification with Customer', '1 Week'],
            // ['', 'Setup Program Simulation and Panels for FAT', '1 Week'],
            ['Week 7', 'FAT of Drive Panel', '1 Day'],
            ['', 'Package Panel and Ship to Customer Facility', '1 Day'],
            ['', 'Provide Drawings to Site for Installation', '2 Days'],
        ])
        // const options = ref({
        //     'Zones': 2,
        //     'Pilots': 'No',
        // })

        return { 
            proposalName,
            // date,
            // customerName,
            // employer,
            // site,
            panelDescription,
            systemSummary,
            systemDetails,
            objectives,
            deliverables,
            equipmentList,
            scheduleData,
            // options,
        }
    },
}
</script>

<style scoped lang="less">
#panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
#grid {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}
#frame {
    margin-top: 50px;
    // margin-left: 400px;
    border: 1px solid #d3dae6;
    border-radius: 6px;
    box-sizing: border-box;
    transition: 0.17s all ease-in-out;
    width: 800px;
    &:hover {
        border: 1px solid #fff;
        box-shadow: 0 0 0 1px rgba(50, 50, 93, 0.05),
        0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
    }
};
#sideFrame {
    margin-top: 50px;
    min-width: 300px;
   
};
#fixedDetails {
    position: fixed;
    min-width: 300px;
}
#proposal {
    font-family: Ebrima;
    text-align: justify;
    margin: 40px;
    display: block
};
// #proposal th {
//   padding-top: 12px;
//   padding-bottom: 12px;
//   text-align: left;
//   background-color: #04AA6D;
//   color: white;
// }
#proposal > h1 {
    font-size: 40px;
};
#proposal > h2 {
    font-size: 35px;
};
#proposal > h3 {
    font-size: 25px;
};
#proposal > h4 {
    font-size: 20px;
};
#proposal > h5 {
    font-size: 16px;
};
#proposal > p{
    display: block;
    margin-bottom: 10px
};
#pad {
    padding-top: 100px;
};

#banner {
    background-color: #244061;
    color: white;
}


</style>