/* global describe, it, expect */

import { shallow } from 'enzyme'
import BarChart from '../../components/d3/BarChart'

describe('<MyComponent />', () => {
  it('renders three <BarChart /> components', () => {
    const wrapper = shallow(<BarChart />)
    expect(wrapper.find(BarChart)).to.have.lengthOf(3)
  })

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<BarChart />)
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <BarChart>
        <div className='unique' />
      </BarChart>
    ))
    expect(wrapper.contains(<div className='unique' />)).to.equal(true)
  })
})
