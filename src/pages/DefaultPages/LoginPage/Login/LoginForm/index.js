import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
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

  render() {
    const { form, isSubmitForm } = this.props

    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please log in</strong>
        </h4>
        <br />
        <div className="mb-2">
          Email: <code>admin@mediatec.org</code> or <code>agent@mediatec.org</code>
        </div>
        <div className="mb-4">
          Password: <code>123123</code>
        </div>
        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
          <FormItem label="Email">
            {form.getFieldDecorator('username', {
              initialValue: 'admin@mediatec.org',
              rules: [
                { type: 'email', message: 'The input is not a valid e-mail address' },
                { required: true, message: 'Please input your e-mail address' },
              ],
            })(<Input size="default" />)}
          </FormItem>
          <FormItem label="Password">
            {form.getFieldDecorator('password', {
              initialValue: '123123',
              rules: [{ required: true, message: 'Please input your password' }],
            })(<Input size="default" type="password" />)}
          </FormItem>
          <div className="mb-2">
            <a href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
              Forgot password
            </a>
          </div>
          <div className="form-actions">
            <Button
              type="primary"
              className="width-150 mr-4"
              htmlType="submit"
              loading={isSubmitForm}
            >
              Login
            </Button>
            <Button className="width-100" htmlType="button">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginForm
