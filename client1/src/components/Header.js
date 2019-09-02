import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <body style= {{backgroundColor:"#0000ff"}}>
                <tr >
                    <th><img src="http://www.jscens.hcmut.edu.vn/img/BK.png" width="150" height="150"></img></th>
                    <th><p style= {{fontSize :"150%",marginLeft :"20px",color:"#ffffff"}}>Bach Khoa University</p>
                        <p style= {{fontSize :"150%", marginLeft:"20px",color:"#ffffff"}}>EEC department</p>
                    </th>
                </tr>
                </body>
            </div>
        )
    }
}
