import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "@/styles/TestCase.css";
// Import custom CSS

const TestCase = () => {
  const [testCases, setTestCases] = useState([
    {
      name: '',
      method: 'GET',
      url: '',
      queryParams: [{ key: '', value: '', description: '' }],
      body: '',
    },
  ]);

  const addNewRow = () => {
    setTestCases([
      ...testCases,
      {
        name: '',
        method: 'GET',
        url: '',
        queryParams: [{ key: '', value: '', description: '' }],
        body: '',
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleQueryParamChange = (index, paramIndex, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].queryParams[paramIndex][field] = value;
    setTestCases(updatedTestCases);
  };

  const addQueryParam = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].queryParams.push({ key: '', value: '', description: '' });
    setTestCases(updatedTestCases);
  };

  const saveTestCase = (index) => {
    console.log('Saved test case:', testCases[index]);
  };

  const deleteTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  return (
    <div className="testcase-container container-fluid p-4">
      <button onClick={addNewRow} className="btn mb-4 create-button">
        Create Testcase+
      </button>

      <div className="table-responsive rounded-table">
        <table className="table table-borderless">
          <thead className="thead-light">
            <tr>
              <th className="p-3 text-secondary fw-normal" rowSpan={2}>
                Name
              </th>
              <th className="p-3 text-secondary fw-normal" rowSpan={2}>
                Method &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; URL
              </th>
              <th className="p-3 text-secondary fw-normal" style={{ width: '300px' }} rowSpan={2}>
                Query Parameters
              </th>
              <th className="p-3 text-secondary fw-normal" style={{ width: '300px' }} rowSpan={2}>
                Body
              </th>
              <th className="p-3 text-secondary fw-normal" rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control fs-7"
                    value={testCase.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                </td>

                <td>
                  <div className="d-flex align-items-center gap-0">
                    <select
                      className="form-select fs-7"
                      style={{ width: '100px', borderRadius: '4px 0 0 4px' }}
                      value={testCase.method}
                      onChange={(e) => handleInputChange(index, 'method', e.target.value)}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <input
                      type="text"
                      className="form-control fs-7"
                      style={{ borderRadius: '0 4px 4px 0', flex: 1 }}
                      value={testCase.url}
                      onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                      placeholder="https://example.com/api"
                    />
                  </div>
                </td>

                <td style={{ width: '300px' }}>
                  {testCase.queryParams.map((param, paramIndex) => (
                    <div key={paramIndex} className="mb-2">
                      <input
                        type="text"
                        className="form-control mb-1 fs-7"
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) =>
                          handleQueryParamChange(index, paramIndex, 'key', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-1 fs-7"
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) =>
                          handleQueryParamChange(index, paramIndex, 'value', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-1 fs-7"
                        placeholder="Description"
                        value={param.description}
                        onChange={(e) =>
                          handleQueryParamChange(index, paramIndex, 'description', e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button onClick={() => addQueryParam(index)} className="btn-query btn-sm fs-7">
                    Add Query Param
                  </button>
                </td>

                <td style={{ width: '300px' }}>
                  <textarea
                    className="form-control fs-7"
                    value={testCase.body}
                    onChange={(e) => handleInputChange(index, 'body', e.target.value)}
                    placeholder="Enter JSON data"
                  />
                </td>

                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      onClick={() => saveTestCase(index)}
                      className="btn btn-success btn-sm fs-7"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => deleteTestCase(index)}
                      className="btn btn-danger btn-sm fs-7"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestCase;
