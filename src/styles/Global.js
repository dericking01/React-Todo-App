import { createGlobalStyle } from 'styled-components'
const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    border: none;
    outline: none;
    font-family:'satisfy','poppins','sans serif';
    scrollbar-width:none;

}
body{
    background-image: linear-gradient(to right top, #0f3a73, #1e4582, #2b4f92, #375ba2, #4366b2, #496ebe, #5077c9, #567fd5, #5887de, #5b8ee8, #5d96f1, #5f9efb);
    padding:2rem ;
    background-size: 100% 120%;
    font-display: optional;
    @media (max-width:620px){
        padding:0.2rem;
    }
}

button,input{
  font-family: inherit;
}
input{
  font-family: 'poppins', 'sans serif';
}
p,h4{
    color: ${({ theme }) => theme.color.secondary};
}
h1,h2,h3,li{
    color: ${({ theme }) => theme.color.primary};
}
h4{
    font-weight: ${({ theme }) => theme.font.w_normal};
}




*::-webkit-scrollbar-track {
    width: 7px;
    background-color: #343446;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3),
      inset 0 2px 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3),
      inset 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  *::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #78789d;
  }

`
export default GlobalStyles
