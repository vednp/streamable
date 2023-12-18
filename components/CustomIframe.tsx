import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const CustomIframe = ({ children, ...props }) => {
 const iframeRef = useRef(null);
 const [mountNode, setMountNode] = useState(null);

 useEffect(() => {
   setMountNode(iframeRef.current.contentWindow.document.body);
 }, []);

 return (
   <iframe {...props} ref={iframeRef}>
     {mountNode && createPortal(children, mountNode)}
   </iframe>
 );
}

export default CustomIframe;