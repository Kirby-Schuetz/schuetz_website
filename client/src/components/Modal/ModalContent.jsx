import { Document, Page } from 'react-pdf';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import { pdfjs } from 'react-pdf';
import linkedinIcon from '../Modal/linkedinIcon.png';
import githubIcon from "../Modal/githubIcon.png";
import downloadIcon from "../Modal/downloadIcon.png";
import schuetzResume from '../../assets/schuetzResume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function ModalContent() {
  const { toPDF, targetRef } = usePDF({filename: 'schuetzResume.pdf'});
    return (
        <div className="contactCard">
          <h1>contact card</h1>
          <div className="nav-container">
          <img src={linkedinIcon} alt="linkedin link" width="25" height="25"
          onClick={(e) => {e.preventDefault();
            window.location.href='https://www.linkedin.com/in/kirby-schuetz';
            }}
            />
          <img src={githubIcon} alt="github link" width="25" height="25"
          onClick={(e) => {e.preventDefault();
            window.location.href='https://github.com/Kirby-Schuetz';
            }}
            />
          <img src={downloadIcon} alt="download resume" width="25" height="25"
          onClick={() => toPDF()}/>
          </div>
          <Document
            file={ schuetzResume }
            >
            <Page             
            pageNumber={1} 
            style={{ width: 'auto', height: '100%' }}/>
          </Document>
        </div>
        
    );
}