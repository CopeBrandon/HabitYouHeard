import React, { FunctionComponent, MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { styled } from '@mui/system';

// type Props = {
//     // onClick: MouseEventHandler,
//     // text: string,
//     content: string
// }
// const StyledLink = styled(Link)`
//     textDecoration: 'none'
// `;
const StyledLink = styled(Link)({
    textDecoration: 'none'
}); // you may need to add "as typeof TYPE" in order to make it work fi its a materialui component, IE grid or whatever
type Props = {
    to: string,
    content: string,
    id: string,
    children: React.ReactNode
}
const LinkButton = 
(props: Props) => (
    <StyledLink  to={props.to}>
        <Button variant='contained' {...props}>{props.children}</Button>
    </StyledLink>
);

export default LinkButton;
/*
Example use of LinkButton:
{endButtons ? endButtons.map((button) => (
    <LinkButton to={button.link} key={button.id}>{button.content} </LinkButton>
)) : ""}
<LinkButton to="/auth/signin" onClick={handleSignout}>Logout</LinkButton>
*/