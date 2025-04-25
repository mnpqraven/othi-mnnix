# @ref https://github.com/srid/monorepo-nix-template
{
  description = "top level monorepo flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";
    flake-utils.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs =
    { nixpkgs, self, ... }@inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        # @see https://github.com/direnv/direnv/issues/73#issuecomment-2478178424
        # Function to create script
        mkScript =
          name: text:
          let
            script = pkgs.writeShellScriptBin name text;
          in
          script;

        # Define your scripts/aliases
        # FIXME: pnpx/npx = big bad on load time
        scripts = [
          (mkScript "nx" ''pnpx nx "$@"'')
        ];
        build_all = pkgs.writeShellScriptBin "build_all" ''
          echo "Running build command on all targets"
          pnpx nx run-many -t lint,build
        '';
        # FIXME: pnpx/npx = big bad on load time
        dev_all = pkgs.writeShellScriptBin "dev_all" ''
          echo "Running dev containers on all targets"
          pnpx nx run-many -t dev
        '';
        dev_othi = pkgs.writeShellScriptBin "dev_othi" ''
          echo "Running dev containers on target othi"
          pnpx nx dev othi
        '';

      in
      {
        # INFO: nix build
        # TODO:
        packages = {
          inherit build_all dev_all dev_othi;
        };

        # INFO: nix run
        apps = rec {
          default = dev_all;
          build_all = {
            type = "app";
            program = "${self.packages.${system}.build_all}/bin/build_all";

          };
          dev_all = {
            type = "app";
            program = "${self.packages.${system}.dev_all}/bin/dev_all";
          };
          dev_othi = {
            type = "app";
            program = "${self.packages.${system}.dev_othi}/bin/dev_othi";
          };
        };

        # INFO: nix develop
        devShell = pkgs.mkShell {
          buildInputs = [
            # put needed packages here
          ] ++ scripts;
          packages = with pkgs; [
            # TODO: configure
            # node2nix
            nodejs_22
            nodePackages.pnpm
          ];
          shellHook = ''
            echo "View flake outputs with 'nix flake show'"
            echo "Start targets by running 'nix run' or the verbose command 'pnpx nx dev othi'"
          '';
        };
      }
    );
}
