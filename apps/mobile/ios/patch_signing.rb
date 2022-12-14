def patch_siging(installer, targets_to_fix: ["React-Core-AccessibilityResources"], codesign_rn_pods: true)
    puts 'Setting appropriate code signing identities'

    # Get main project development team id, or fetch from env var: dev_team = ENV['XCODE_DEVELOPMENT_TEAM']
    dev_team = ""
    project = installer.aggregate_targets[0].user_project
    project.targets.each do |target|
        target.build_configurations.each do |config|
            if dev_team.empty? and !config.build_settings['DEVELOPMENT_TEAM'].nil?
                dev_team = config.build_settings['DEVELOPMENT_TEAM']
            end
        end
    end

    installer.pods_project.targets.each do |target|
        target_is_resource_bundle = target.respond_to?(:product_type) && target.product_type == 'com.apple.product-type.bundle'
        target.build_configurations.each do |config|
            # Bitcode is not needed for now, XCode 14.1.0+
            # config.build_settings['ENABLE_BITCODE'] = 'YES'

            if targets_to_fix.include?(target.name) || target_is_resource_bundle
            puts "Set development team for target #{target.name}, isBundle: #{target_is_resource_bundle}, dev_team: #{dev_team}"
            config.build_settings['DEVELOPMENT_TEAM'] = dev_team
            if codesign_rn_pods
                if config.name.include?('Release')
                puts " .. Setting codesign identity to distribution for target #{target.name}"
                config.build_settings["CODE_SIGN_IDENTITY"] = "Apple Distribution";
                config.build_settings["CODE_SIGN_STYLE"] = "Manual";
                end
            else
                puts " .. Removing code signing for target #{target.name}"
                config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
                config.build_settings['CODE_SIGNING_REQUIRED'] = 'NO'
                config.build_settings['CODE_SIGNING_IDENTITY'] = '-'
                config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = '-'
            end
            end
        end
    end
end