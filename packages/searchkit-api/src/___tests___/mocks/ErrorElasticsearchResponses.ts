export const KeyUnauthorizedForIndex = {
  took: 1,
  responses: [
    {
      error: {
        root_cause: [
          {
            type: 'security_exception',
            reason:
              'action [indices:data/read/search] is unauthorized for API key id [Mh4zEYUBrIyUUg3_BzSy] of user [1506416774] on indices [my-exampjje-movies], this action is granted by the index privileges [read,all]'
          }
        ],
        type: 'security_exception',
        reason:
          'action [indices:data/read/search] is unauthorized for API key id [Mh4zEYUBrIyUUg3_BzSy] of user [1506416774] on indices [my-exampjje-movies], this action is granted by the index privileges [read,all]'
      },
      status: 403
    }
  ]
}

export const ElasticsearchError = {
  error: [
    {
      error: {
        root_cause: [
          {
            type: 'internal_server_error',
            reason:
              'Elasticsearch Internal Error: Check your elasticsearch instance to make sure it can recieve requests.'
          }
        ],
        type: 'internal_server_error',
        reason:
          'Elasticsearch Internal Error: Check your elasticsearch instance to make sure it can recieve requests.'
      }
    }
  ],
  status: 500
}

export const APIKeyNotAuthorized = {
  error: {
    root_cause: [
      {
        type: 'security_exception',
        reason:
          'unable to authenticate with provided credentials and anonymous access is not allowed for this request',
        additional_unsuccessful_credentials:
          'API key: Input byte array has incorrect ending byte at 60',
        header: {
          'WWW-Authenticate': [
            'Basic realm="security" charset="UTF-8"',
            'Bearer realm="security"',
            'ApiKey'
          ]
        }
      }
    ],
    type: 'security_exception',
    reason:
      'unable to authenticate with provided credentials and anonymous access is not allowed for this request',
    additional_unsuccessful_credentials:
      'API key: Input byte array has incorrect ending byte at 60',
    header: {
      'WWW-Authenticate': [
        'Basic realm="security" charset="UTF-8"',
        'Bearer realm="security"',
        'ApiKey'
      ]
    }
  },
  status: 401
}

export const InvalidRequest = {
  error: {
    root_cause: [
      {
        type: 'parsing_exception',
        reason: '[bla] query malformed, no start_object after query name',
        line: 1,
        col: 46
      }
    ],
    type: 'x_content_parse_exception',
    reason: '[1:46] [bool] failed to parse field [filter]',
    caused_by: {
      type: 'parsing_exception',
      reason: '[bla] query malformed, no start_object after query name',
      line: 1,
      col: 46
    }
  },
  status: 400
}
