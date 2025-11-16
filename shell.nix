let
  pkgs = import <nixpkgs> { config = {}; overlays = []; };
in pkgs.mkShell {
  nativeBuildInputs = with pkgs;[
    deno
    nodejs_22
  ];
}
