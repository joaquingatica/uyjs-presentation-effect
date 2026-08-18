let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-26.05";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    deno
    nodejs_22
  ];
}
