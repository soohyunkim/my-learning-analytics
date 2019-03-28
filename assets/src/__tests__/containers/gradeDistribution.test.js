/* global describe, test, expect, jest */
import GradeDistribution from '../../containers/GradeDistribution'
import { shallow } from 'enzyme' 
jest.mock('../../service/api')

describe('GradeDistributionTest', () => {
  test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const wrapper = shallow(<GradeDistribution />)
    expect(wrapper).toEqual('Off')
  })
})
