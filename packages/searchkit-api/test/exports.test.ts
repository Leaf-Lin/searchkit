import Client, { SearchkitConfig, MultipleQueriesQuery } from '@searchkit/api'
import nock from 'nock'
import { HitsResponseWithFacetFilter } from '../../searchkit/src/___tests___/mocks/ElasticsearchResponses'
import { DisjunctiveExampleRequest } from '../../searchkit/src/___tests___/mocks/AlgoliaRequests'
import 'cross-fetch/polyfill'

describe('exports', () => {
  it('works as expected', async () => {
    const config: SearchkitConfig = {
      connection: {
        host: 'http://localhost:9200',
        apiKey: 'a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw=='
      },
      search_settings: {
        highlight_attributes: ['title', 'actors'],
        search_attributes: ['title', 'actors', 'query'],
        result_attributes: ['title', 'actors', 'query'],
        facet_attributes: [
          'type',
          { field: 'actors.keyword', attribute: 'actors', type: 'string' },
          'rated'
        ]
      }
    }

    const client = Client(config)

    nock('http://localhost:9200')
      .post('/_msearch', (requestBody: any) => {
        expect(requestBody).toMatchSnapshot('ES Request')
        const x = JSON.parse(requestBody.split('\n')[1]).query
        // has the base filter applied in addition to the facet filter
        expect(x).toMatchInlineSnapshot(`
          {
            "bool": {
              "filter": [
                {
                  "bool": {
                    "should": [
                      {
                        "term": {
                          "type": "movie",
                        },
                      },
                    ],
                  },
                },
                {
                  "bool": {
                    "must": {
                      "range": {
                        "imdbrating": {
                          "gte": 1,
                        },
                      },
                    },
                  },
                },
              ],
              "must": {
                "bool": {
                  "should": [
                    {
                      "bool": {
                        "should": [
                          {
                            "multi_match": {
                              "fields": [
                                "title",
                                "actors",
                                "query",
                              ],
                              "fuzziness": "AUTO:4,8",
                              "query": "shawshank",
                            },
                          },
                          {
                            "multi_match": {
                              "fields": [
                                "title",
                                "actors",
                                "query",
                              ],
                              "query": "shawshank",
                              "type": "bool_prefix",
                            },
                          },
                        ],
                      },
                    },
                    {
                      "multi_match": {
                        "fields": [
                          "title",
                          "actors",
                          "query",
                        ],
                        "query": "shawshank",
                        "type": "phrase",
                      },
                    },
                  ],
                },
              },
            },
          }
        `)
        return true
      })
      .reply(200, HitsResponseWithFacetFilter)

    const response = await client.handleRequest(
      DisjunctiveExampleRequest as MultipleQueriesQuery[],
      {
        getBaseFilters: () => {
          return [
            {
              bool: {
                must: {
                  range: {
                    imdbrating: {
                      gte: 1
                    }
                  }
                }
              }
            }
          ]
        }
      }
    )

    expect(response).toMatchSnapshot()
  })
})
