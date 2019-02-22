import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = isSubmitForm => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  }

  onChange = e => {
    console.log(`checked = ${e.target.checked}`)
  }

  render() {
    const { form, isSubmitForm } = this.props

    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please log in</strong>
        </h4>
        <br />
        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
          <FormItem label="Email">
            {form.getFieldDecorator('username', {
              initialValue: '',
              rules: [
                { type: 'email', message: 'The input is not a valid e-mail address' },
                { required: true, message: 'Please input your e-mail address' },
              ],
            })(<Input size="default" />)}
          </FormItem>
          <FormItem label="Password">
            {form.getFieldDecorator('password', {
              initialValue: '',
              rules: [{ required: true, message: 'Please input your password' }],
            })(<Input size="default" type="password" />)}
          </FormItem>
          <div className="mb-2" style={{ display: 'flex' }}>
            <div>
              <Checkbox onChange={this.onChange}>Remember me</Checkbox>
            </div>
            <div style={{ flex: 1 }} />
            <div>
              <a href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="form-actions">
            <Button
              type="primary"
              className="mr-4 mt-5"
              htmlType="submit"
              loading={isSubmitForm}
              style={{ width: 80 }}
            >
              Sign In
            </Button>
            <a href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
              Register
            </a>
            <label style={{ marginLeft: 5 }}>if you don't have an account</label>
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginForm
