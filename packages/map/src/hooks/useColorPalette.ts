import { useReducer } from 'react';
import { colorPalettes } from '../data/color-palettes';

// create constants 
export const ON_SEQUENTIAL = 'ON_SEQUENTIAL';
export const ON_SEQUENTIAL_REVERSE = 'ON_SEQUENTIAL_REVERSE';
export const ON_NON_SEQUENTIAL = 'ON_NON_SEQUENTIAL';
export const ON_NON_SEQUENTIAL_REVERSE = 'ON_NON_SEQUENTIAL_REVERSE';

// create types & interfaces 
// type PalletTypes = typeof colorPalettes;
// type PalletType = keyof PalletTypes;
interface State {
    readonly filteredPallets:any[]
    readonly filteredQualitative:any[]
    readonly isSwitched: boolean;
    readonly isSwitched2: boolean;
   }
   interface Action {
    type:
      | 'ON_SEQUENTIAL_REVERSE'
      | 'ON_SEQUENTIAL'
      | 'ON_NON_SEQUENTIAL'
      | 'ON_NON_SEQUENTIAL_REVERSE';
    payload: typeof colorPalettes;
  }

// create initial state
const initialState:State = {
    filteredPallets: [],
    filteredQualitative: [],
    isSwitched: false,
    isSwitched2: false,
  };

// create reducer function to handle multiple states & manupilate with each state
function reducer (state:State,action:Action){
  const palletNamesArr:string[] = Object.keys(action.payload); // action.payload === colorPalettes object
  let reverseRegex = new RegExp('reverse$'); // matches a string that ends in with "reverse".
  let qualitativeRegex = new RegExp('^qualitative'); //matches any string that starts with "qualitative".

  switch(action.type){
    case ON_SEQUENTIAL:
      const sequential = palletNamesArr.filter((name: string) =>!name.match(qualitativeRegex) && !name.match(reverseRegex));
  
      return { ...state, isSwitched: false, filteredPallets: sequential };
     case ON_SEQUENTIAL_REVERSE:
        const sequentialReverse = palletNamesArr.filter((name: string) =>!name.match(qualitativeRegex) && name.match(reverseRegex));
        return { ...state, isSwitched: true, filteredPallets: sequentialReverse };
  
     case ON_NON_SEQUENTIAL:
        const qualitative = palletNamesArr.filter((name: string) => name.match(qualitativeRegex) && (!name.match(reverseRegex) && !name.includes('qualitative9')));
        return { ...state, isSwitched2: false, filteredQualitative: qualitative };
      
    case ON_NON_SEQUENTIAL_REVERSE:
        const qualitativeReverse = palletNamesArr.filter((name: string) =>name.match(qualitativeRegex) && name.match(reverseRegex));
        return { ...state,isSwitched2: true,filteredQualitative: qualitativeReverse};
      default : return state;
  }
}
// create custon hook and export
export function useColorPalette(){
    // register reducer hook to handle multiple states at a time
  const [state, dispatch] = useReducer(reducer, initialState);

    return;
}