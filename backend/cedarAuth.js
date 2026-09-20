const {
  CedarInlineAuthorizationEngine
} = require("@cedar-policy/cedar-authorization");

const schema = JSON.stringify({
  GridMitra: {
    entityTypes: {
      FieldWorker: {
        shape: {
          attributes: {},
          type: "Record"
        },
        memberOfTypes: []
      },
      EvidencePackage: {
        shape: {
          attributes: {},
          type: "Record"
        },
        memberOfTypes: []
      }
    },
    actions: {
      RequestReview: {
        appliesTo: {
          principalTypes: ["FieldWorker"],
          resourceTypes: ["EvidencePackage"],
          context: {
            type: "Record",
            attributes: {}
          }
        }
      }
    }
  }
});

const authorizer = new CedarInlineAuthorizationEngine({
  staticPolicies: `
    permit(
      principal,
      action == GridMitra::Action::"RequestReview",
      resource
    );
  `,
  schema: {
    type: "jsonString",
    schema
  },
  validateRequest: true
});

async function authorizeRequestReview(packageId) {
  const result = await authorizer.isAuthorized(
    {
      principal: {
        type: "GridMitra::FieldWorker",
        id: "field-worker-1"
      },
      action: {
        type: "GridMitra::Action",
        id: "RequestReview"
      },
      resource: {
        type: "GridMitra::EvidencePackage",
        id: String(packageId)
      },
      context: {}
    },
    [
      {
        uid: {
          type: "GridMitra::FieldWorker",
          id: "field-worker-1"
        },
        attrs: {},
        parents: []
      },
      {
        uid: {
          type: "GridMitra::EvidencePackage",
          id: String(packageId)
        },
        attrs: {},
        parents: []
      }
    ]
  );

  return result;
}

module.exports = {
  authorizeRequestReview
};