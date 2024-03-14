import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';
import './CustomDrawer.css';
import { ProductCard } from '../ProductCard/ProductCard';

export default function CustomDrawer({ label, icon: Icon }) {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const cartItems = useSelector(state => state.cart.cart);

  const list = (anchor) => (
    <Box>
      {cartItems.map((element, index) => (
        <div key={`${element.id}-${index}`}>
          <ProductCard key={element.id} product={element} />
        </div>
      ))}
    </Box>
  );

  return (
    <div className='drawer'>
      {[ label].map((anchor) => (
        <React.Fragment key={anchor}>
          {Icon && (
            <Icon
              color="primary"
              sx={{ fontSize: 50, cursor: 'pointer' }}
              onClick={toggleDrawer(anchor, true)}
            />
          )}
          <Drawer
            anchor={"right"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
