import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardCart from './components/pages/Cart/CardInCart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a mock Redux store
const mockStore = configureStore([]);

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useParams: () => ({ productId: '123' }),
  useNavigate: () => jest.fn(),
}));

// Optionally, you may also mock the antd message hook if needed
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  return {
    ...antd,
    message: {
      useMessage: () => [jest.fn(), <div data-testid="messageHolder" />],
    },
  };
});

describe('CardCart Component Layout', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });
    // Mock fetch to return dummy product data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            _id: '123',
            name: 'Test Product',
            image: 'test.jpg',
            price: 99,
            quantity: 10,
          }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders layout correctly with product information', async () => {
    render(
      <Provider store={store}>
        <Router>
          <CardCart id="123" />
        </Router>
      </Provider>
    );

    // Wait for the product name to appear
    const productName = await screen.findByText('Test Product');
    expect(productName).toBeInTheDocument();

    // Check that the price is rendered
    const productPrice = screen.getByText('$99');
    expect(productPrice).toBeInTheDocument();

    // Check for the decrement and increment buttons
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();

    // Check for the remove link
    const removeLink = screen.getByText('Remove');
    expect(removeLink).toBeInTheDocument();
  });

  it('removes the component when the remove link is clicked', async () => {
    render(
      <Provider store={store}>
        <Router>
          <CardCart id="123" />
        </Router>
      </Provider>
    );

    // Wait for the product to load
    await screen.findByText('Test Product');

    const removeLink = screen.getByText('Remove');
    fireEvent.click(removeLink);

    // After clicking remove, the component should return null and nothing is rendered
    expect(screen.queryByText('Test Product')).toBeNull();
  });
});