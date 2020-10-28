import styled from 'styled-components'

export const App = styled.div`
background-color: #222;
text-align: center;
min-height: calc(100vh - 10vw + 40px);
width: 100vw;
padding: calc(5vw - 20px) 0;
> * + * { margin-top: calc(5vw - 20px); }
`
export const PaletteModule = styled.section`
display: block;
width: 90vw;
margin: auto;
padding: 20px;
background: ${props => props.hex};
transition-property: background;
transition-duration: 0.2s;
transition-timing-function: initial;
> * + * { margin-top: 10px; }
`
export const GradientRow = styled.div`
display: inline-flex;
width: 100%;
height: 100px;
margin-bottom: ${props => props.shadeRange ? `-10px` : `0px`}
`
export const Swatch = styled.div`
font-family: Theia;
display: inline-flex;
flex-grow: 1;
height: 100px;
background: ${props => props.hex};
transition-property: all;
transition-duration: .2s;
transition-timing-function: initial;
align-items: center;
justify-content: center;
`
export const Icon = styled.div`
font-family: Delve;
font-size: 25px;
`
export const ControlStrip = styled.div`
display: flex;
height: 36px;
> * + * { margin-left:10px }
`
export const ControlStripSpacer = styled.div`
flex-grow: 1;
`
