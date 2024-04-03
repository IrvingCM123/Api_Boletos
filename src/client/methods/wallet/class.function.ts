export function generete_Class(classId: any) {
    let genericClass = {
        'id': `${classId}`,
        'classTemplateInfo': {
            'cardTemplateOverride': {
                'cardRowTemplateInfos': [
                    {
                        'twoItems': {
                            'startItem': {
                                'firstValue': {
                                    'fields': [
                                        {
                                            'fieldPath': 'object.textModulesData["points"]'
                                        }
                                    ]
                                }
                            },
                            'endItem': {
                                'firstValue': {
                                    'fields': [
                                        {
                                            'fieldPath': 'object.textModulesData["contacts"]'
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            },
            'detailsTemplateOverride': {
                'detailsItemInfos': [
                    {
                        'item': {
                            'firstValue': {
                                'fields': [
                                    {
                                        'fieldPath': 'class.imageModulesData["event_banner"]'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        'item': {
                            'firstValue': {
                                'fields': [
                                    {
                                        'fieldPath': 'class.textModulesData["game_overview"]'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        'item': {
                            'firstValue': {
                                'fields': [
                                    {
                                        'fieldPath': 'class.linksModuleData.uris["official_site"]'
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        },
        'imageModulesData': [
            {
                'mainImage': {
                    'sourceUri': {
                        'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-2021-card.png'
                    },
                    'contentDescription': {
                        'defaultValue': {
                            'language': 'en-US',
                            'value': 'Google I/O 2022 Banner'
                        }
                    }
                },
                'id': 'event_banner'
            }
        ],
        'textModulesData': [
            {
                'header': 'Gather points meeting new people at Google I/O',
                'body': 'Join the game and accumulate points in this badge by meeting other attendees in the event.',
                'id': 'game_overview'
            }
        ],
        'linksModuleData': {
            'uris': [
                {
                    'uri': 'https://io.google/2022/',
                    'description': 'Official I/O \'22 Site',
                    'id': 'official_site'
                }
            ]
        }
    };

    return genericClass;
}