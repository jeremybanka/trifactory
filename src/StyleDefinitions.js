import styled from 'styled-components'

export const App = styled.div`
background-color: #111;
text-align: center;
min-height: calc(100vh - 10vw + 40px);
width: 100vw;
padding: calc(5vw - 20px) 0;
> section { 
  width: 90vw;
  padding: 20px;
  margin: auto;
  > * + * { margin-top: 10px; }
}
> section + section { margin-top: calc(5vw - 20px); }
`
export const GradientRow = styled.div`
display: inline-flex;
width: 100%;
height: 100px;
margin-bottom: ${props => props.shadeRange ? `-10px` : `0px`}
`
export const ControlCluster = styled.div`
display: flex;
> * + * { margin-left: 2px }
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
