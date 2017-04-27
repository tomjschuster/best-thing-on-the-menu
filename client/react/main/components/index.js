import React, { Component } from 'react'
import { Layout, Panel } from 'react-toolbox'
import AppBar from 'react-toolbox/lib/app_bar'
import FontIcon from 'react-toolbox/lib/font_icon'

export default class Main extends Component {
  render() {
    const { auth, endSession, router, children } = this.props
    return (
      <Layout>
        <Panel>
          <AppBar
            title='The Best Thing On The Menu'
            leftIcon={<FontIcon value='room_service' />}
            onLeftIconClick={() => auth.isAuthenticated && router.push('/explore')}
            rightIcon={<FontIcon value='exit_to_app' />}
            onRightIconClick={() => endSession()}
          />
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            <div className='tagline'>
              <h4>Taskstream's Lunch Menu Review</h4>
            </div>
            {children}
          </div>
        </Panel>
      </Layout>
    )
  }
}
