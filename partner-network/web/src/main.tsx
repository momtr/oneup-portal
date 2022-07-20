import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, ChakraTheme, ComponentStyleConfig, extendTheme, transition } from '@chakra-ui/react'
import chakraUiTheme from '@chakra-ui/theme'
import { FaBorderNone } from 'react-icons/fa'
import { AuthProvider } from './tools/auth'

const theme = extendTheme({
  colors: {
    f2cm_pink: {
      DEFAULT: '#FF0460',
      '50': '#FFBCD4',
      '100': '#FFA7C7',
      '200': '#FF7EAE',
      '300': '#FF5694',
      '400': '#FF2D7A',
      '500': '#FF0460',
      '600': '#CB004A',
      '700': '#930036',
      '800': '#5B0021',
      '900': '#23000D'
    },
  },
  fonts: {
    body: "Roboto",
    heading: "gilroy-bold",
  },
  styles: {
    global: {
      'body': {
        //margin: "2rem",
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: "underline",
        _hover: {
          color: "f2cm_pink.500",
        },
        _focus: {
          boxShadow: "none",
          color: "f2cm_pink.500",
        },
      }
    },
    Button: {
      variants: {
        f2cm: {
          background: "linear-gradient(90deg, #FF0460 0%, #FFCF11 100%)",
          color: "white",
          _hover: {
            boxShadow: "0 0 5px rgba(145, 92, 182, .4)",
            transition: "none"
          },
          _focus: {
            boxShadow: "#CBD5E0 0px 0px 0px 3px"
          }
        }
      }
    },
    Input: {
      variants: {
        flushed: {
          field: {
            _focus: {
              borderColor: 'f2cm_pink.500',
              boxShadow: '0px 1px 0px 0px #FF0460'
            },
          }
        }
      }
    },
    Textarea: {
      variants: {
        f2cm: {
          variant: "fillded",
          bg: "gray.200",
          borderWidth: '0px',
          borderStyle: 'solid',
          borderColor: 'f2cm_pink.500',
          _hover: {bg: 'gray.100'},
          _focus: {
            borderWidth: '2px',
            bg: 'gray.100'
          },
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
