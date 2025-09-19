export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade As</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter</option>
              <option value="PASSFAIL">Pass/Fail</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="IN-PERSON">In-person</option>
              <option value="NONE">None</option>
            </select> <br /><br />
            <div>Online Entry Options</div>
            <input type="checkbox" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File upload</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign To</label><br />
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date"/><br /><br />

            <table>
              <tr>
                <td>
                  <label htmlFor="wd-available-from">Available From</label>
                </td>
                <td>
                  <label htmlFor="wd-available-until">Available Until</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input id="wd-available-from" type="date"/>
                </td>
                <td>
                  <input id="wd-available-until" type="date"/>
                </td>
              </tr>
            </table>

          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
          </td>
          <td>
            <hr></hr>
            <button id="cancel">Cancel</button><button id="save">Save</button>
          </td>
        </tr>
      </table>
      
    </div>
);}
