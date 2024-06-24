// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';

// import "./Accordian.scss"

// import { TbPhotoSquareRounded } from "react-icons/tb";
// import { CiVideoOn } from "react-icons/ci";
// import { BsFiles } from "react-icons/bs";
// import { AiOutlineAudio } from "react-icons/ai";
// import { PiLinkSimple } from "react-icons/pi";

// import userFace from "../../../../assets/userFace.jpg";


// export default function AccordionUsage() {
//     return (
//         <div>
//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                 >
//                     <div className="accordianHead">
//                         <TbPhotoSquareRounded size={25} />
//                         <span>265 Photos</span>
//                     </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//                     malesuada lacus ex, sit amet blandit leo lobortis eget. */}

//                     <div id="chatInfoPhotos">
//                         {/* <img src={userFace} alt="" /> */}
//                     </div>

//                 </AccordionDetails>
//             </Accordion>

//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2-content"
//                     id="panel2-header"
//                 >
//                     <div className="accordianHead">
//                         <CiVideoOn size={25} />
//                         <span>50 videos</span>
//                     </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <div id="chatInfoPhotos">

//                     </div>
//                 </AccordionDetails>
//             </Accordion>

//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2-content"
//                     id="panel2-header"
//                 >
//                     <div className="accordianHead">
//                         <BsFiles size={25} />
//                         <span>50 files</span>
//                     </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//                     malesuada lacus ex, sit amet blandit leo lobortis eget.
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2-content"
//                     id="panel2-header"
//                 >
//                     <div className="accordianHead">
//                         <AiOutlineAudio size={25} />
//                         <span>50 Audio files</span>
//                     </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//                     malesuada lacus ex, sit amet blandit leo lobortis eget.
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2-content"
//                     id="panel2-header"
//                 >
//                     <div className="accordianHead">
//                         <PiLinkSimple size={25} />
//                         <span>50 Embedded Links</span>
//                     </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//                     malesuada lacus ex, sit amet blandit leo lobortis eget.
//                 </AccordionDetails>
//             </Accordion>

//             {/* <Accordion defaultExpanded>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel3-content"
//                     id="panel3-header"
//                 >
//                     Accordion Actions
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//                     malesuada lacus ex, sit amet blandit leo lobortis eget.
//                 </AccordionDetails>
//                 <AccordionActions>
//                     <Button>Cancel</Button>
//                     <Button>Agree</Button>
//                 </AccordionActions>
//             </Accordion> */}
//         </div>
//     );
// }


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import "./Accordian.scss";

import { TbPhotoSquareRounded } from "react-icons/tb";
import { CiVideoOn } from "react-icons/ci";
import { BsFiles } from "react-icons/bs";
import { AiOutlineAudio } from "react-icons/ai";
import { PiLinkSimple } from "react-icons/pi";

export default function AccordionUsage() {
    return (
        <div>
            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="accordionSummary"
                >
                    <div className="accordianHead">
                        <TbPhotoSquareRounded size={25} />
                        <span>265 Photos</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    <div id="chatInfoPhotos">
                        {/* <img src={userFace} alt="" /> */}
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className="accordionSummary"
                >
                    <div className="accordianHead">
                        <CiVideoOn size={25} />
                        <span>50 videos</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    <div id="chatInfoPhotos">
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className="accordionSummary"
                >
                    <div className="accordianHead">
                        <BsFiles size={25} />
                        <span>50 files</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className="accordionSummary"
                >
                    <div className="accordianHead">
                        <AiOutlineAudio size={25} />
                        <span>50 Audio files</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className="accordionSummary"
                >
                    <div className="accordianHead">
                        <PiLinkSimple size={25} />
                        <span>50 Embedded Links</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

