import styled from 'styled-components'

export const App = styled.div`
background-color: #222;
text-align: center;
min-height: calc(100vh - 10vw + 40px);
width: 100vw;
padding: calc(5vw - 20px) 0;
> section + section { margin-top: calc(5vw - 20px); }
`
export const PaletteModuleWrapper = styled.section`
display: block;
width: 90vw;
margin: auto;
padding: 20px;
background: ${props => props.hex};
transition-property: background;
transition-duration: 0.33s;
transition-timing-function: initial;
> * + * { margin-top: 10px; }
`
export const GradientRow = styled.div`
display: inline-flex;
width: 100%;
height: 100px;
margin-bottom: ${props => props.shadeRange ? `-10px` : `0px`}
`
export const Icon = styled.div`
font-family: Delve;
font-size: 25px;
`
export const ControlStrip = styled.div`
display: flex;
> * + * { margin-left:10px }
`
export const ControlStripSpacer = styled.div`
flex-grow: 1;
`
export const PreviewArea = styled.div`
height: 100px;
margin-bottom: 20px;
> div {
  background: ${props => props.hex};
  height: 100px;
  width: 100px;
  border-radius: 100%;
  border: 2px solid white;
  cursor: pointer;
}
`
