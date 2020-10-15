import styled from 'styled-components'

const Main = styled.div`
background-color: #eee;
text-align: center;
min-height: calc(100vh - 10vw + 60px);
width: 100vw;
padding: calc(5vw - 30px) 0;
`
const Color = styled.div`
display: block;
width: 90vw;
margin: auto;
padding: 20px;
margin-top: 10px;
background: ${props => props.hex};
transition-property: background;
transition-duration: 0.2s;
transition-timing-function: initial;
`
const Row = styled.div`
display: inline-flex;
width: 100%;
height: 100px;
margin-top: 10px;
`
const Swatch = styled.div`
display: inline-flex;
flex-grow: 1;
height: 100px;
background: ${props => props.hex};
transition-property: all;
transition-duration: 2s;
transition-timing-function: initial;
`
const Icon = styled.div`
font-family: Delve;
font-size: 25px;
`
const ControlStrip = styled.div`
display: flex;
height: 36px;
`
const HexInput = styled.input`
display: flex;
height: 36px;
font-size: 20px;
border: none;
padding: 0 10px;
width: 90px;
`
const InputLabel = styled.div`
background: white;
color: #666;
display: flex;
height: 36px;
font-size: 20px;
border: none;
padding-left: 10px;
align-items: center;
`
export {
  Main,
  Color,
  Row,
  Swatch,
  Icon,
  ControlStrip,
  HexInput,
  InputLabel,
}
