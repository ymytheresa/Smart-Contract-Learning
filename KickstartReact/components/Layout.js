// for every page , reusable
// cannot be visited by user independently, so should be placed outside the pages folder 
import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Head from 'next/head'; //Head tag will move things inside the head tag to be inside HTML that head 

//things wrapped in <Layout> inside js of pages will be send to props.children
export default props => {
    return (
        <Container>
            <Head>
                <link 
                    rel="stylesheet" 
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" 
                />
            </Head>
            
            <Header/>
            {props.children}
        </Container>
    );
};