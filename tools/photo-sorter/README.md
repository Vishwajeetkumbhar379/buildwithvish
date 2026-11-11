# Photo Sorter by Vish

Sort a messy camera roll in minutes. One photo at a time: **Keep**, **Maybe** or **Delete**.

- Points out blurry shots and near copies, and tells you which copy is the sharpest.
- Arrow keys on a computer, swipes on a phone, Undo for everything.
- Downloads your keepers as one zip file. The originals are never changed.
- Runs entirely in your browser. No upload, no account, no tracking, no libraries.

## Use it

Open `index.html` in a browser. That is the whole install.

| Action | Key | Swipe |
|---|---|---|
| Keep | `→` or `K` | right |
| Maybe | `↑` or `M` | up |
| Delete | `←` or `D` | left |
| Undo | `Z` or Backspace | |

"Delete" only means the Delete pile. Nothing is removed from your device. Copy the list of file names from the review screen and remove them yourself.

## How the checks work

- **Blur:** each photo is softened again in memory. A sharp photo loses a lot of detail when softened, a blurry one barely changes. That ratio is the score, so a calm sky is not mistaken for a blurry shot.
- **Near copies:** each photo gets a 64-bit fingerprint of its light and dark pattern. Photos taken close together with almost the same fingerprint are grouped.
- **Dark or bright:** average brightness of the frame.

## Limits

- HEIC photos preview in Safari. Other browsers can sort them by name but show no preview.
- One zip can hold up to about 3.5 GB.

Made by Vish Kumbhar. MIT licence.
