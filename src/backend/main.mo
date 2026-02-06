import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type ProjectBrief = {
    projectName : Text;
    description : Text;
    goals : Text;
    budget : ?Nat;
    timeline : ?Text;
  };

  // Authorization setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent storage for project briefs
  let projectBriefs = Map.empty<Principal, ProjectBrief>();

  public shared ({ caller }) func saveProjectBrief(brief : ProjectBrief) : async () {
    // Only allow saving if the caller is authenticated as a user
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save project briefs");
    };
    projectBriefs.add(caller, brief);
  };

  public query ({ caller }) func getCallerProjectBrief() : async ?ProjectBrief {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view project briefs");
    };
    projectBriefs.get(caller);
  };
};
