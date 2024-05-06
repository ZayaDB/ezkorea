
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
export default function PriceFilter() {
  return (
    <Box sx={{ width:' 80%', margin: '5px' }}>
      <Slider defaultValue={50} aria-label='Default' valueLabelDisplay='auto' />
    </Box>
  );
}
