# Evidence draft maintenance

The persisted ledger is a continuity barrier, not approval. Do not put ledger regeneration in build.mjs, CI verification or a pre-commit hook. A failing sourceHash or editionHash requires review of the changed claim, not automatic acceptance of its current bytes.

For a new or corrected record, first inspect the primary identity and relevant source material. Record what was accessible, the design, population, limits and rights. Review all eight drafts against the shared brief. Change only the affected source and locale bindings. Preserve humanReviewed and scientificApproval as false unless a separate documented human procedure genuinely authorizes a different schema. This cycle has no such authorization.

The public locale-parity.json is a derived report. Never edit it or release.json directly. Build them from the exact source commit. Legacy content is not silently upgraded to shared-brief or native-reviewed status.

For an explicit, reviewed draft revision, use sourceDraftMaterial and editionDraftMaterial exported by src/evidence-continuity.mjs with digest from src/messages.mjs. Write the resulting sourceHash and the eight editionHashes only for the selected record in src/evidence-bindings.json. Supply a nonempty reason in that binding and document the source-level decision in the scope/review ledger. Update the record's briefHash fields after reviewing its revised brief. Changing a source also requires review of dependent narrative bindings. Tests must then pass without changing their substantive assertions.

A usesMeasure field records observed instrument use in that study. It does not establish a psychometric validation, adaptation, permission grant or clinical endorsement. relatedRecords names editorial reading connections, not verified replication or equivalence edges.

Publication uses docs/design/DEPLOYMENT.md. Preserve all unrelated host entries, require a tested exact source and a non-force ref update, wait for actual Pages success, then inspect release identity, file hashes and browser journeys at the public origin. Archive receipts and real remaining review limits.
