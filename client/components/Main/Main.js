import React from 'react'
import { Layout, Panel } from 'react-toolbox'
import AppBar from 'react-toolbox/lib/app_bar'
import FontIcon from 'react-toolbox/lib/font_icon'
import { history } from '../../router'

const Main = ({ auth, endSession, children }) => (
  <Layout>
    <Panel>
      <AppBar
        title="The Best Thing On The Menu"
        leftIcon={<FontIcon value="room_service" />}
        onLeftIconClick={() => auth.isAuthenticated && history.push('/explore')}
        rightIcon={
          auth.isAuthenticated ? <FontIcon value="exit_to_app" /> : null
        }
        onRightIconClick={() => endSession()}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        <div className="tagline">
          <h4>Taskstream's Lunch Menu Review</h4>
        </div>
        {children}
      </div>
    </Panel>
  </Layout>
)

export default Main
