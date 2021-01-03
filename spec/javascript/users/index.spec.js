import React from 'react'
import { render } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import New from '../../../app/javascript/src/components/Users/new'

const mockStore = configureStore()

describe('New', () => {
  const store = mockStore({
    table: {
      items: []
    }
  })

  const component = render(
    <Provider store={store}>
      <HashRouter>
        <New />
      </HashRouter>
    </Provider>
  )

  it('matches snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
