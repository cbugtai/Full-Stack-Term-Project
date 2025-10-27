# Architectural Layout - User Dashboard

This document outlines the purpose, logic, and usage of key hooks, services,
repositories, and context used in the User Dashboard.

---

## Hooks

### useBioValidation
**Purpose:**
Validates bio input for length and profanity.
**Logic Decisions:**
Centralizes bio validation logic to avoid duplication across components.
Uses isValidBio and containsProfanity to enforce length and content rules.
Keeps validation isolated from UI and returns a single error string.
Designed for reuse in profile settings and extensible to backend validation if
shared services are used.
**Used In:**
Bio edit modal in profile settings. The hook is invoked within the EditBio form
component to validate the bio field on blur and submit. It checks for length and profanity,
returning a single error string. If validation fails, the error is displayed inline and
the submit button is disabled. On successful validation, the updated bio is saved via
userRepo and reflected in global state using setUser.

### useChangePasswordValidation
**Purpose:**
Validates password strength, match confirmation, and current password presence.
**Logic Decisions:**
Validates password strength and ensures the new password differs from the current one.
Uses isStrongPassword for regex-based strength checks. Returns field-specific errors
and disables submission until validation passes. Designed for reuse in profile settings
and extensible to auth flows.
**Used In:**
Change password modal in profile settings. The hook is invoked inside the ChangePassword
form component to validate field input before submission. It checks password strength
and match confirmation using regex, and returns field-specific errors (errors.newPass,
errors.confirm). The form disables submission until validation passes. After validation,
the current password is hashed and compared against the stored hash. If matched, the new
password is hashed and persisted via updateUser.

### useContactValidation
**Purpose:**
Validates email and phone number formats. Requires at least one contact method.
**Logic Decisions:**
Normalizes input using trim() to prevent false negatives. Applies regex-based
format checks via profileValidationService for both email and phone fields.
Separates general errors (e.g. missing contact info) from field-specific errors
to support granular inline feedback. Designed for reuse in profile settings and
extensible to registration flows.
**Used In:**
Contact form in profile settings. The hook is used within the ManageContact component to
validate email and phone fields on submit. It ensures that at least one contact method
is present and valid, applying regex checks via profileValidationService.
Validation errors are mapped to errors.email, errors.phone, and errors.general,
which are rendered inline beneath each field. On successful validation,
updated contact info is persisted via saveUser and reflected in global state using setUser.

### useDeleteAccountValidation
**Purpose:**
Confirms irreversible account deletion with password re-entry and optional feedback.
**Logic Decisions:**
Encapsulates irreversible action confirmation in a dedicated hook.
Requires an exact match of the string "DELETE" to proceed. Keeps validation logic
isolated from UI and ensures clear, inline error messaging. Designed for simplicity
and safety in destructive flows.
**Used In:**
Delete account modal in profile settings. The hook is used in the DeleteAccount component
to validate the confirmation input on form submission. If validation passes, deleteUser()
is called to remove the account and restore the mock user. Errors are displayed inline,
and the delete button is disabled during processing.

### useProfilePictureValidation
**Purpose:**
Validates uploaded profile images for type, and size.
**Logic Decisions:**
Blocks invalid uploads early. MIME checks, size limits enforcement.
Supports fallback avatars.
**Used In:**
Profile picture uploader in the ChangeProfilePicture settings view. The hook is invoked
when a file is selected via the hidden file input. It validates the file's MIME type,
and size before allowing it to be passed to updateProfilePicture.
If validation fails, an error message is displayed inline. If valid, the image is uploaded,
a blob URL is generated, and the updated profile picture is saved to IndexedDB and
reflected in global state via setUser.

### useUsernameValidation
**Purpose:**
Validates username format and filters profanity.
**Logic Decisions:**
Uses isValidUsername for format enforcement and containsProfanity to block
inappropriate content. Keeps validation logic isolated from UI and returns a single
error string. Designed for reuse across profile settings and future registration flows.
**Used In:**
Username change form in profile settings. The hook is used within the ChangeUsername
component to validate the input on submit. It checks format and profanity locally,
then performs an async uniqueness check before allowing the update. If validation fails,
an error message is displayed inline and the submit button remains disabled. On success,
the updated username is saved via saveUser and reflected in global state using setUser.

### useListing
**Purpose:**
Manages listing mutations and integrates with listingService to mark listings as sold.
**Logic Decisions:**
Encapsulates side-effect-heavy logic (e.g. status updates) to keep UI components
declarative. Uses useUser to access and refresh listing state after mutations.
Designed to isolate async flows and prevent redundant state management in views.
Keeps mutation logic centralized and predictable.
**Used In:**
CurrentListings dashboard view. markListingAsSold(id) is called when a user removes
a listing. After mutation, refreshListings() is triggered to sync UI with updated state.
This separation ensures clean component structure and avoids coupling UI with data operations.

### useListingValidation
**Purpose:**
Validates listing fields—title, description, price, category, condition, city, and image.
**Logic Decisions:**
Modular schema supports both create and edit flows. Uses listingValidationService
for field-level checks and profanity filtering. Handles conditional logic for
pricing and image presence.
**Used In:**
Listing form components in both CreateListing and EditListing. The hook is called
on form submission to validate all required fields, including conditional logic for
pricing and image presence. It returns a keyed errors object
(errors.title, errors.price, etc.) used to display inline error messages.
Prevents submission until all validations pass, ensuring consistent formatting
and content standards across listing flows. Also supports optional blur-based
validation for future extensibility.

### useMockUser
**Purpose:**
Provides mock user data for development and testing.
**Logic Decisions:**
Isolated from production logic. Uses local storage and blob URLs to simulate profile pictures.
Supports full user lifecycle: fetch, update, delete, and restore.
**Used In:**
Profile settings components such as ChangePassword, ChangeProfilePicture,
and DeleteAccount. The hook loads user data from userRepo or falls back to
mockUser on mount. It integrates with profilePicRepo to simulate profile picture
updates and revokes blob URLs on cleanup. Also used in dev-only flows and test
environments to enable realistic UI testing without backend dependencies.

---

## Services

### listingService
**Purpose:**
Handles listing-related API interactions—create, update, delete, and mark as sold.
**Logic Decisions:**
Abstracts network logic from UI and hooks. Keeps request formatting and
error handling centralized. Designed for clean integration with listing flows and
supports retry logic if extended.
**Used In:**
useListing calls listingService.markAsSold(id) to update listing status.
Internally, this wraps updateListing(id, { status: "sold" }) from listingRepo
to persist changes. After mutation, refreshListings() is triggered via userContext
to sync UI state.

### listingValidationService
**Purpose:**
Centralizes listing field validation—title, description, price, category, condition, city,
and image.
**Logic Decisions:**
Keeps validation logic modular and DRY. Uses regex and range checks for formatting,
profanity filtering for content, and conditional logic for pricing/image requirements.
Designed for reuse across frontend hooks.
**Used In:**
useListingValidation imports validators like isValidTitle, isValidPrice, isValidCity,
and containsProfanity. These are applied during form submission in both CreateListing
and EditListing to populate errors and block invalid listings.

### profileValidationService
**Purpose:**
Validates profile fields, bio, contact info, username, email, phone, and password strength.
**Logic Decisions:**
Consolidates all profile-related rules into a single module. Uses regex for format checks,
profanity filtering for content, and length constraints for bios and usernames.
Designed to support both client-side and server-side validation.
**Used In:**
useBioValidation, useChangePasswordValidation, useContactValidation, and
useUsernameValidation all import specific validators (e.g. isValidBio, isStrongPassword,
isValidEmail, isValidUsername). These are used in profile settings forms to validate
fields and submit, with errors displayed inline.

---

## Repositories

### listingImageRepo
**Purpose:**
Manages image uploads and storage for listing images using IndexedDB.
**Logic Decisions:**
Separates image persistence from listing metadata. Uses openDB() to access the
listingImages store and stores files keyed by listing ID. Wraps the transaction
in a promise to ensure reliable completion and error handling. Designed for local-first
storage and easy retrieval.
**Used In:**
Listing form image uploader. When a user selects an image, saveListingImage(id, file)
is called to store it in IndexedDB before the listing metadata is saved.
The uploader component checks for existing images and handles preview rendering.

### listingRepo
**Purpose:**
Handles all listing CRUD operations using IndexedDB—create, read, update, delete,
and hydrate with image data.
**Logic Decisions:**
Keeps persistence logic out of UI and services. Uses openDB() to access the listings store
and wraps transactions in promises for reliable completion. Supports optimistic updates
via updateListing, and hydration via getHydratedListing which combines listing metadata
with image blobs. Designed for local-first storage and easy integration with listing flows.
**Used In:**
- listingService calls updateListing(id, updates) to mark listings as sold.
- Dashboard and seller history views use getListingsByUserId(userId)
  to filter listings by owner.
- Listing detail pages use getHydratedListing(id) to fetch listing data and
  generate a preview image from stored blobs.
- Listing form uses saveListing(listing) to persist new or edited listings,
  and deleteListing(id) to remove them.
- Listing detail pages and dashboard views use getHydratedListing(id) to fetch
  listing data and generate a preview image from stored blobs.

### profilePicRepo
**Purpose:**
Handles profile image storage, retrieval, and deletion using IndexedDB.
**Logic Decisions:**
Separates image persistence from user metadata. Uses a fixed key ("current")
in the profilePics store to simplify access and updates. Wraps all transactions
in promises for reliable async handling. Designed for local-first workflows with
support for blob-based previews and cleanup of outdated images.
**Used In:**
- Profile settings: when a user uploads a new profile picture, saveProfilePicture(file)
  stores it under the "current" key.
- User avatar components: getProfilePicture() fetches the current image and generates
  a blob URL for rendering.
- useMockUser: integrates with this repo to simulate profile picture updates and
  revokes old blob URLs to prevent memory leaks.
- Deletion logic: deleteProfilePicture() is called when resetting or replacing the
  current image, ensuring clean state.
- useMockUser integrates with this repo to simulate profile picture updates and
  revokes blob URLs on cleanup to prevent memory leaks.

### userRepo
**Purpose:**
Manages user data persistence—save, retrieve, delete, and hydrate with profile image.
**Logic Decisions:**
Stores user metadata in IndexedDB under a fixed "current" key.
Wraps all transactions in promises for reliable async control.
Hydration logic combines user data with a blob URL from profilePicRepo
for avatar rendering. deleteUser() resets state by restoring mockUser
and regenerating the profile image blob.
**Used In:**
- useMockUser calls getUser() on mount to hydrate state, falling back to
  mockUser if none exists.
- updateUser() uses saveUser() to persist changes and sync UI.
- deleteUser() removes the current user and restores mockUser, including profile image
  regeneration.
- getHydratedUser() is used to combine stored user data with a blob URL for
  avatar rendering in components.

---

## Context

### userContext
**Purpose:**
Provides global access to authenticated user data and associated listings.
**Logic Decisions:**
Centralizes user and listing state to eliminate prop drilling and redundant fetches.
Hydrates user with profile image via getHydratedUser, and listings via getHydratedListing.
Wraps state setters and refresh logic in context to keep components lean and reactive.
Ensures fallback logic and error isolation during async operations.
**Used In:**
- UserProvider wraps the app and initializes user and listing state on mount.
- refreshUser() fetches and sets the hydrated user, including blob URL for profile image.
- refreshListings() hydrates each listing with its image blob for preview rendering.
- useUser() is called in components like header, dashboard, and settings to access user,
- useUser() throws if called outside of UserProvider, ensuring context integrity.
  listings, and their respective refresh/set functions.
- Enables reactive UI updates when listings are marked as sold or profile data changes.