import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardCart from './components/pages/Cart/CardInCart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a mock Redux store
const mockStore = configureStore([]);

// Mock react-router-dom hooks (if needed)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock antd message
jest.mock('antd', () => {
  const actualAntd = jest.requireActual('antd');
  return {
    ...actualAntd,
    message: {
      useMessage: () => [jest.fn(), <div data-testid="messageHolder" />],
    },
  };
});

describe('CardCart Component Layout', () => {
  let store;

  const testProduct = {
    _id: '123',
    name: 'Test Product',
    image: 'test.jpg',
    price: 99,
    quantity: 10,
  };

  beforeEach(() => {
    store = mockStore({
      cart: { items: [ { ...testProduct, quantity: 1 } ] },
    });
  });

  it('renders layout correctly with product information', () => {
    render(
      <Provider store={store}>
        <Router>
          <CardCart product_in={testProduct} />
        </Router>
      </Provider>
    );

    // Check for product name and price
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();

    // Check increment and decrement buttons
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();

    // Check remove link
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('removes the component when the remove link is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <CardCart product_in={testProduct} />
        </Router>
      </Provider>
    );

    const removeLink = screen.getByText('Remove');
    fireEvent.click(removeLink);

    expect(screen.queryByText('Test Product')).toBeNull();
  });

  it('disables increment button when quantity equals stock', () => {
    store = mockStore({
      cart: { items: [{ ...testProduct, quantity: 10 }] },
    });

    render(
      <Provider store={store}>
        <Router>
          <CardCart product_in={testProduct} />
        </Router>
      </Provider>
    );

    const incrementButton = screen.getByText('+');
    expect(incrementButton).toBeDisabled();
  });
});
